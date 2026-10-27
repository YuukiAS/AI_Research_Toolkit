#!/usr/bin/env python3
"""Validate the Architecture Ledger research artifact without network access."""

from __future__ import annotations

import json
import re
import sys
from collections import defaultdict
from pathlib import Path
from typing import Any, Iterable

import jsonschema

ROOT = Path(__file__).resolve().parent
LEDGER_PATH = ROOT / "example-ledger.json"
SCHEMA_PATH = ROOT / "semantic-model.schema.json"
MODEL_JS_PATH = ROOT / "prototype" / "model.js"
HEX40 = re.compile(r"^[0-9a-f]{40}$")
MD_LINK = re.compile(r"!?(?:\[[^\]]*\])\(([^)]+)\)")


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def ids(items: Iterable[dict[str, Any]]) -> set[str]:
    return {str(item["id"]) for item in items}


def revision_namespaces(revision: dict[str, Any]) -> dict[str, set[str]]:
    components = revision.get("components", [])
    mechanisms = [m for c in components for m in c.get("mechanisms", [])]
    anchors = [a for c in components for a in c.get("anchors", [])]
    anchors += [a for e in revision.get("evidence", []) for a in e.get("anchors", [])]
    return {
        "component": ids(components),
        "relation": ids(revision.get("relations", [])),
        "mechanism": ids(mechanisms),
        "anchor": ids(anchors),
        "decision": ids(revision.get("decisions", [])),
        "evidence": ids(revision.get("evidence", [])),
        "issue": ids(revision.get("issues", [])),
    }


def validate() -> dict[str, Any]:
    errors: list[str] = []
    warnings: list[str] = []
    checks: list[str] = []

    ledger = json.loads(LEDGER_PATH.read_text(encoding="utf-8"))
    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    jsonschema.Draft202012Validator(schema).validate(ledger)
    checks.append("JSON Schema Draft 2020-12")

    expected_model = "window.ARCH_LEDGER = " + json.dumps(
        ledger, ensure_ascii=False, separators=(",", ":")
    ) + ";\n"
    if MODEL_JS_PATH.read_text(encoding="utf-8") != expected_model:
        fail(errors, "prototype/model.js 与 example-ledger.json 不一致")
    else:
        checks.append("浏览器数据包与结构化账本一致")

    project_ids: set[str] = set()
    object_totals: defaultdict[str, int] = defaultdict(int)

    for project in ledger["projects"]:
        pid = project["id"]
        if pid in project_ids:
            fail(errors, f"重复项目 ID: {pid}")
        project_ids.add(pid)

        revisions = project.get("revisions", [])
        rev_by_id = {rev["id"]: rev for rev in revisions}
        if len(rev_by_id) != len(revisions):
            fail(errors, f"{pid}: 修订 ID 不唯一")
        if project["currentRevision"] not in rev_by_id:
            fail(errors, f"{pid}: currentRevision 不存在")

        for revision in revisions:
            rid = revision["id"]
            parent_id = revision.get("parent")
            if parent_id is not None and parent_id not in rev_by_id:
                fail(errors, f"{pid}/{rid}: parent {parent_id} 不存在")
            if parent_id == rid:
                fail(errors, f"{pid}/{rid}: 修订不能以自身为父修订")

            current_ns = revision_namespaces(revision)
            parent_ns = revision_namespaces(rev_by_id[parent_id]) if parent_id else {
                key: set() for key in current_ns
            }
            combined_ns = {
                key: current_ns[key] | parent_ns[key] for key in current_ns
            }
            all_current = set().union(*current_ns.values())
            all_combined = set().union(*combined_ns.values())

            for kind, namespace in current_ns.items():
                object_totals[kind] += len(namespace)
                if len(namespace) != sum(
                    1
                    for value in (
                        revision.get("components", []) if kind == "component" else
                        revision.get("relations", []) if kind == "relation" else
                        [m for c in revision.get("components", []) for m in c.get("mechanisms", [])] if kind == "mechanism" else
                        [a for c in revision.get("components", []) for a in c.get("anchors", [])] + [a for e in revision.get("evidence", []) for a in e.get("anchors", [])] if kind == "anchor" else
                        revision.get("decisions", []) if kind == "decision" else
                        revision.get("evidence", []) if kind == "evidence" else
                        revision.get("issues", [])
                    )
                ):
                    fail(errors, f"{pid}/{rid}: {kind} ID 不唯一")

            component_ids = current_ns["component"]
            evidence_ids = current_ns["evidence"]
            issue_ids = current_ns["issue"]

            for relation in revision.get("relations", []):
                if relation["source"] not in component_ids:
                    fail(errors, f"{pid}/{rid}/{relation['id']}: source 不存在")
                if relation["target"] not in component_ids:
                    fail(errors, f"{pid}/{rid}/{relation['id']}: target 不存在")
                if not relation.get("payload", "").strip():
                    fail(errors, f"{pid}/{rid}/{relation['id']}: 缺少真实载荷或约束")

            for evidence_id in revision.get("triggerEvidenceIds", []):
                if evidence_id not in evidence_ids:
                    fail(errors, f"{pid}/{rid}: 触发证据 {evidence_id} 不存在")

            for component in revision.get("components", []):
                cid = component["id"]
                status = component["status"]
                mechanisms = component.get("mechanisms", [])
                anchors = component.get("anchors", [])
                if status["design"] == "accepted" and not mechanisms:
                    fail(errors, f"{pid}/{rid}/{cid}: 已接受设计缺少机制层")
                if status["implementation"] == "linked":
                    if not any(a.get("verified") for a in anchors):
                        fail(errors, f"{pid}/{rid}/{cid}: linked 但没有已验证源码锚点")
                if status["evidence"] == "validated":
                    if not any(
                        a.get("verified") and a.get("kind") in {"test", "result", "evidence"}
                        for a in anchors
                    ):
                        fail(errors, f"{pid}/{rid}/{cid}: validated 但没有已验证测试或结果锚点")
                for issue_id in component.get("issues", []):
                    if issue_id not in issue_ids:
                        fail(errors, f"{pid}/{rid}/{cid}: issue {issue_id} 不存在")
                for anchor in anchors:
                    aid = anchor["id"]
                    commit = anchor.get("commit", "")
                    if anchor.get("verified") and not HEX40.fullmatch(commit):
                        fail(errors, f"{pid}/{rid}/{cid}/{aid}: verified 锚点未绑定 40 位提交")
                    if anchor.get("required") and not anchor.get("verified"):
                        fail(errors, f"{pid}/{rid}/{cid}/{aid}: 必需锚点尚未验证")
                    if not anchor.get("verified"):
                        warnings.append(f"{pid}/{rid}/{cid}/{aid}: 锚点仍待验证")

            for decision in revision.get("decisions", []):
                for evidence_id in decision.get("evidenceIds", []):
                    if evidence_id not in evidence_ids:
                        fail(errors, f"{pid}/{rid}/{decision['id']}: evidence {evidence_id} 不存在")
                for target in decision.get("impact", []):
                    if target not in all_current:
                        fail(errors, f"{pid}/{rid}/{decision['id']}: impact {target} 不存在")

            for issue in revision.get("issues", []):
                for target in issue.get("targets", []):
                    if target not in all_current:
                        fail(errors, f"{pid}/{rid}/{issue['id']}: target {target} 不存在")
                for evidence_id in issue.get("evidenceIds", []):
                    if evidence_id not in evidence_ids:
                        fail(errors, f"{pid}/{rid}/{issue['id']}: evidence {evidence_id} 不存在")

            for change in revision.get("changes", []):
                target_type = change["targetType"]
                target_id = change["targetId"]
                if target_id not in combined_ns[target_type]:
                    fail(
                        errors,
                        f"{pid}/{rid}: 变更目标 {target_type}:{target_id} 在当前或父修订中均不存在",
                    )
                if not change.get("reason", "").strip():
                    fail(errors, f"{pid}/{rid}/{target_id}: 变更缺少原因")
                if change["kind"] in {"modify", "remove", "supersede"} and not change.get("triggerEvidenceIds"):
                    fail(errors, f"{pid}/{rid}/{target_id}: 重大变更缺少触发证据")
                for evidence_id in change.get("triggerEvidenceIds", []):
                    if evidence_id not in evidence_ids:
                        fail(errors, f"{pid}/{rid}/{target_id}: trigger evidence {evidence_id} 不存在")
                for target in change.get("impact", []):
                    if target not in all_combined:
                        fail(errors, f"{pid}/{rid}/{target_id}: impact {target} 不存在")

    checks.append("跨对象引用、三轴状态和因果变更完整性")

    missing_links: list[str] = []
    for md_path in ROOT.rglob("*.md"):
        text = md_path.read_text(encoding="utf-8")
        for raw_target in MD_LINK.findall(text):
            target = raw_target.strip().split()[0].strip("<>")
            if not target or target.startswith(("http://", "https://", "mailto:", "#")):
                continue
            target = target.split("#", 1)[0]
            if not target:
                continue
            resolved = (md_path.parent / target).resolve()
            if not resolved.exists():
                missing_links.append(f"{md_path.relative_to(ROOT)} -> {target}")
    if missing_links:
        for link in missing_links:
            fail(errors, f"失效本地链接: {link}")
    else:
        checks.append("Markdown 本地链接")

    required_assets = [
        ROOT / "prototype" / "index.html",
        ROOT / "prototype" / "styles.css",
        ROOT / "prototype" / "app.js",
        ROOT / "prototype" / "model.js",
        ROOT / "prototype" / "preview.png",
        ROOT / "prototype" / "preview-diff.png",
        ROOT / "prototype" / "preview-checks.png",
        ROOT / "prototype" / "preview-mobile.png",
    ]
    for asset in required_assets:
        if not asset.exists() or asset.stat().st_size == 0:
            fail(errors, f"缺少原型资产: {asset.relative_to(ROOT)}")
    checks.append("原型入口与四类截图资产")

    return {
        "status": "PASS" if not errors else "FAIL",
        "checks": checks,
        "projects": len(ledger["projects"]),
        "revisions": sum(len(p["revisions"]) for p in ledger["projects"]),
        "objects": dict(sorted(object_totals.items())),
        "warnings": sorted(set(warnings)),
        "errors": errors,
    }


if __name__ == "__main__":
    report = validate()
    print(json.dumps(report, ensure_ascii=False, indent=2))
    sys.exit(0 if report["status"] == "PASS" else 1)
