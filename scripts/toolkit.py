#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
from pathlib import Path
import shlex
import shutil
import subprocess
import sys
from typing import Any

try:
    import yaml
except ModuleNotFoundError:
    print(
        "PyYAML is required. Run `bash scripts/bootstrap.sh` and use `bin/ai-research-toolkit`.",
        file=sys.stderr,
    )
    raise


ROOT = Path(os.environ.get("TOOLKIT_ROOT", Path(__file__).resolve().parents[1])).resolve()
INVENTORY = ROOT / "inventory" / "resources.yaml"
CANDIDATES = ROOT / "inventory" / "candidates.yaml"
RETIRED = ROOT / "inventory" / "retired.yaml"
STATE_FILE = ROOT / ".local" / "state" / "resources.json"

ALLOWED_KIND = {"software", "reference"}
ALLOWED_RESOURCE_ROLE = {"software", "reference", "source-material"}
ALLOWED_PRIORITY = {"core", "recommended", "optional", "reference"}
ALLOWED_LIFECYCLE = {"active", "deprecated", "retired"}
ALLOWED_SUPPORT = {"verified", "documented", "unverified", "manual", "reference-only"}
ALLOWED_INTEGRATION = {
    "standalone",
    "source-only",
    "partially-adopted",
    "merged",
    "reference-only",
}
ALLOWED_HEADLESS = {"good", "partial", "poor", "unknown"}
ALLOWED_API_KEY = {True, False, "unknown"}


def now_iso() -> str:
    return dt.datetime.now(dt.timezone.utc).isoformat()


def rel(path: Path) -> str:
    return str(path.relative_to(ROOT))


def run(
    args: list[str],
    cwd: Path | None = None,
    check: bool = False,
    env: dict[str, str] | None = None,
) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        args,
        cwd=str(cwd or ROOT),
        check=check,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=env,
    )


def load_yaml(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def load_resources() -> list[dict[str, Any]]:
    data = load_yaml(INVENTORY)
    resources = data.get("resources")
    if not isinstance(resources, list):
        raise ValueError("inventory/resources.yaml must contain a top-level resources list")
    return resources


def resource_path(resource: dict[str, Any], key: str) -> Path:
    return ROOT / str(resource[key])


def valid_repo_url(value: Any) -> bool:
    if not isinstance(value, str):
        return False
    if value.startswith("TODO:") or value == "not specified":
        return False
    return value.startswith("https://") or value.startswith("git@") or value.startswith("file://") or Path(value).exists()


def validate_inventory() -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    try:
        resources = load_resources()
    except Exception as exc:
        return [str(exc)], warnings

    seen_ids: dict[str, str] = {}
    seen_paths: dict[str, str] = {}
    text = INVENTORY.read_text(encoding="utf-8")
    if "TODO:" in text or "not specified" in text:
        errors.append("formal inventory must not contain TODO: or not specified")

    for idx, r in enumerate(resources):
        prefix = f"resources[{idx}]"
        rid = r.get("id")
        if not isinstance(rid, str) or not rid:
            errors.append(f"{prefix}: id is required")
            continue
        if rid in seen_ids:
            errors.append(f"{rid}: duplicate id also used by {seen_ids[rid]}")
        seen_ids[rid] = rid

        for field in [
            "name",
            "kind",
            "resource_role",
            "category",
            "repo_url",
            "local_path",
            "upstream_path",
            "priority",
            "lifecycle",
            "support_status",
            "integration_status",
            "default_ref",
            "primary_commands",
            "outputs",
            "license",
            "requires_api_key",
            "headless_linux",
            "notes",
        ]:
            if field not in r:
                errors.append(f"{rid}: missing {field}")

        if r.get("kind") not in ALLOWED_KIND:
            errors.append(f"{rid}: invalid kind {r.get('kind')!r}")
        if r.get("resource_role") not in ALLOWED_RESOURCE_ROLE:
            errors.append(f"{rid}: invalid resource_role {r.get('resource_role')!r}")
        if r.get("priority") not in ALLOWED_PRIORITY:
            errors.append(f"{rid}: invalid priority {r.get('priority')!r}")
        if r.get("lifecycle") not in ALLOWED_LIFECYCLE:
            errors.append(f"{rid}: invalid lifecycle {r.get('lifecycle')!r}")
        if r.get("support_status") not in ALLOWED_SUPPORT:
            errors.append(f"{rid}: invalid support_status {r.get('support_status')!r}")
        if r.get("integration_status") not in ALLOWED_INTEGRATION:
            errors.append(f"{rid}: invalid integration_status {r.get('integration_status')!r}")
        if r.get("headless_linux") not in ALLOWED_HEADLESS:
            errors.append(f"{rid}: invalid headless_linux {r.get('headless_linux')!r}")
        if r.get("requires_api_key") not in ALLOWED_API_KEY:
            errors.append(f"{rid}: invalid requires_api_key {r.get('requires_api_key')!r}")
        if not valid_repo_url(r.get("repo_url")):
            errors.append(f"{rid}: repo_url must be a valid URL or local path")

        local_path = r.get("local_path")
        upstream_path = r.get("upstream_path")
        if isinstance(local_path, str):
            if local_path in seen_paths:
                errors.append(f"{rid}: duplicate local_path also used by {seen_paths[local_path]}")
            seen_paths[local_path] = rid
        if isinstance(local_path, str) and isinstance(upstream_path, str):
            local = Path(local_path)
            upstream = Path(upstream_path)
            try:
                upstream.relative_to(local)
            except ValueError:
                errors.append(f"{rid}: upstream_path must be inside local_path")

        local_dir = resource_path(r, "local_path") if "local_path" in r else None
        if r.get("lifecycle") == "active" and local_dir and not local_dir.is_dir():
            errors.append(f"{rid}: active resource local_path does not exist: {local_dir}")
        if local_dir:
            readme = local_dir / "README.md"
            if not readme.is_file():
                errors.append(f"{rid}: resource README.md is required")
            for name in ["install.md", "notes.md", "privacy.md"]:
                if not (local_dir / name).is_file():
                    errors.append(f"{rid}: resource {name} is required")
            if not (local_dir / "examples").is_dir():
                errors.append(f"{rid}: resource examples/ directory is required")
        upstream_dir = resource_path(r, "upstream_path") if "upstream_path" in r else None
        if upstream_dir and upstream_dir.exists() and not upstream_dir.is_dir():
            errors.append(f"{rid}: upstream_path exists but is not a directory")

        commands = r.get("primary_commands")
        if (
            r.get("kind") == "software"
            and r.get("support_status") != "manual"
            and r.get("integration_status") == "standalone"
        ):
            if not isinstance(commands, list) or not commands:
                errors.append(f"{rid}: software resources need primary_commands unless support_status is manual")
        if r.get("kind") == "reference" and r.get("support_status") != "reference-only":
            errors.append(f"{rid}: reference resources must use support_status reference-only")

    for side_path, key in [(CANDIDATES, "candidates"), (RETIRED, "retired_resources")]:
        if not side_path.is_file():
            errors.append(f"missing {rel(side_path)}")
            continue
        data = load_yaml(side_path)
        if key not in data:
            errors.append(f"{rel(side_path)} must contain {key}")

    return errors, warnings


def filter_resources(resources: list[dict[str, Any]], args: argparse.Namespace) -> list[dict[str, Any]]:
    selected = resources
    for attr, key in [
        ("kind", "kind"),
        ("category", "category"),
        ("priority", "priority"),
        ("support_status", "support_status"),
        ("id", "id"),
    ]:
        value = getattr(args, attr, None)
        if value:
            selected = [r for r in selected if r.get(key) == value or (key == "category" and str(r.get(key, "")).startswith(value))]
    return selected


def repo_status(resource: dict[str, Any]) -> dict[str, Any]:
    repo = resource_path(resource, "upstream_path")
    result: dict[str, Any] = {
        "id": resource["id"],
        "path": rel(repo),
        "exists": repo.exists(),
        "is_git_repo": (repo / ".git").is_dir(),
        "remote": None,
        "branch": None,
        "commit": None,
        "dirty": False,
        "untracked": False,
    }
    if not result["is_git_repo"]:
        return result
    remote = run(["git", "-C", str(repo), "remote", "get-url", "origin"])
    branch = run(["git", "-C", str(repo), "branch", "--show-current"])
    commit = run(["git", "-C", str(repo), "rev-parse", "HEAD"])
    porcelain = run(["git", "-C", str(repo), "status", "--porcelain"])
    untracked = run(["git", "-C", str(repo), "ls-files", "--others", "--exclude-standard"])
    result.update(
        {
            "remote": remote.stdout.strip() if remote.returncode == 0 else None,
            "branch": branch.stdout.strip() if branch.returncode == 0 else None,
            "commit": commit.stdout.strip() if commit.returncode == 0 else None,
            "dirty": bool(porcelain.stdout.strip()),
            "untracked": bool(untracked.stdout.strip()),
        }
    )
    return result


def load_state() -> dict[str, Any]:
    if STATE_FILE.is_file():
        try:
            return json.loads(STATE_FILE.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            pass
    return {"updated_at": None, "resources": {}}


def save_state(updates: dict[str, dict[str, Any]]) -> None:
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    state = load_state()
    resources = state.setdefault("resources", {})
    for rid, update in updates.items():
        current = resources.get(rid, {})
        current.update(update)
        current["checked_at"] = now_iso()
        resources[rid] = current
    state["updated_at"] = now_iso()
    STATE_FILE.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def command_env() -> dict[str, str]:
    env = os.environ.copy()
    paths = [
        ROOT / "bin",
        ROOT / ".local" / "envs" / "npm-prefix" / "bin",
        ROOT / ".local" / "envs" / "python-tools" / "bin",
    ]
    env["PATH"] = os.pathsep.join(str(p) for p in paths) + os.pathsep + env.get("PATH", "")
    return env


def detect_command(command: str) -> dict[str, Any]:
    parts = shlex.split(command)
    exe = shutil.which(parts[0], path=command_env()["PATH"])
    if not exe:
        return {"status": "MISSING", "command": command, "executable": None, "version": None, "detail": f"{parts[0]} not found"}
    cp = run(parts, env=command_env())
    output = (cp.stdout or cp.stderr).strip().splitlines()
    detail = output[0] if output else ""
    return {
        "status": "OK" if cp.returncode == 0 else "BROKEN",
        "command": command,
        "executable": exe,
        "version": detail,
        "detail": detail,
    }


def doctor_resources(resources: list[dict[str, Any]], args: argparse.Namespace) -> list[dict[str, Any]]:
    selected = resources
    if args.tool:
        selected = [r for r in resources if r["id"] == args.tool]
    elif not args.all:
        selected = [r for r in resources if r["kind"] == "software" and r["priority"] == "core"]

    results: list[dict[str, Any]] = []
    state_updates: dict[str, dict[str, Any]] = {}
    for r in selected:
        commands = r.get("primary_commands") or []
        if r["kind"] != "software" or r.get("support_status") == "manual" or not commands:
            item = {"id": r["id"], "status": "SKIPPED", "detail": "manual or non-software resource"}
        else:
            checks = [detect_command(commands[0])]
            status = "OK" if checks[0]["status"] == "OK" else checks[0]["status"]
            item = {"id": r["id"], "status": status, "checks": checks, "detail": checks[0]["detail"]}
        results.append(item)
        state_updates[r["id"]] = {"doctor": item}
    save_state(state_updates)
    return results


def smoke_definitions() -> dict[str, dict[str, str]]:
    return {
        "d2": {"src": "examples/smoke/d2/smoke_architecture.d2", "out": ".local/smoke/d2/smoke_architecture.svg", "cmd": "d2 {src} {out}"},
        "graphviz": {"src": "examples/smoke/graphviz/smoke_map.dot", "out": ".local/smoke/graphviz/smoke_map.svg", "cmd": "dot -Tsvg {src} -o {out}"},
        "mermaid-cli": {"src": "examples/smoke/mermaid/smoke_flow.mmd", "out": ".local/smoke/mermaid/smoke_flow.svg", "cmd": "mmdc -i {src} -o {out}"},
        "plantuml": {"src": "examples/smoke/plantuml/smoke_sequence.puml", "out": ".local/smoke/plantuml/smoke_sequence.svg", "cmd": "plantuml -tsvg -o {out_parent} {src}"},
        "typst": {"src": "examples/smoke/typst/smoke_note.typ", "out": ".local/smoke/typst/smoke_note.pdf", "cmd": "typst compile {src} {out}"},
        "manim": {"src": "examples/smoke/manim/smoke_scene.py", "out": "", "cmd": "manim --version"},
    }


def smoke_resources(resources: list[dict[str, Any]], args: argparse.Namespace) -> list[dict[str, Any]]:
    defs = smoke_definitions()
    selected_ids = list(defs) if args.all else ["d2", "graphviz", "mermaid-cli", "plantuml", "typst", "manim"]
    if args.tool:
        selected_ids = [args.tool]
    results: list[dict[str, Any]] = []
    updates: dict[str, dict[str, Any]] = {}
    for rid in selected_ids:
        spec = defs.get(rid)
        if not spec:
            results.append({"id": rid, "status": "SKIPPED", "detail": "no smoke definition"})
            continue
        src = ROOT / spec["src"]
        out = ROOT / spec["out"] if spec["out"] else None
        if not src.exists():
            item = {"id": rid, "status": "BROKEN", "detail": f"missing smoke input {rel(src)}"}
        else:
            if out:
                out.parent.mkdir(parents=True, exist_ok=True)
            cmd = spec["cmd"].format(
                src=str(src),
                out=str(out) if out else "",
                out_parent=str(out.parent) if out else "",
            )
            cp = run(shlex.split(cmd), env=command_env())
            if cp.returncode == 0 and (out is None or out.exists()):
                item = {"id": rid, "status": "OK", "output": rel(out) if out else None, "detail": ((cp.stdout or cp.stderr).strip().splitlines() or [""])[0]}
            else:
                detail = ((cp.stderr or cp.stdout).strip().splitlines() or ["render failed"])[0]
                item = {"id": rid, "status": "BROKEN", "output": rel(out) if out else None, "detail": detail}
        results.append(item)
        updates[rid] = {"smoke": item}
    save_state(updates)
    return results


def generated_index(resources: list[dict[str, Any]]) -> str:
    lines = [
        "# Resource Index",
        "",
        "Generated from inventory/resources.yaml. Do not edit by hand.",
        "",
    ]
    for title, predicate in [
        ("Software", lambda r: r["kind"] == "software"),
        ("References", lambda r: r["kind"] == "reference"),
    ]:
        lines += [
            f"## {title}",
            "",
            "| ID | Name | Role | Priority | Lifecycle | Integration | Support | Outputs |",
            "| --- | --- | --- | --- | --- | --- | --- | --- |",
        ]
        for r in resources:
            if predicate(r):
                outputs = ", ".join(r.get("outputs") or [])
                lines.append(
                    f"| `{r['id']}` | {r['name']} | `{r['resource_role']}` | `{r['priority']}` | `{r['lifecycle']}` | `{r['integration_status']}` | `{r['support_status']}` | {outputs} |"
                )
        lines.append("")
    return "\n".join(lines)


def generated_license(resources: list[dict[str, Any]]) -> str:
    lines = [
        "# License Audit",
        "",
        "Generated from inventory/resources.yaml. Do not edit by hand.",
        "",
        "Unknown licenses require manual review before reusing upstream code directly.",
        "",
        "| ID | Name | Repo URL | License | Last verified commit | Reuse note |",
        "| --- | --- | --- | --- | --- | --- |",
    ]
    for r in resources:
        note = "do not reuse code directly before manual license check" if r.get("license") == "unknown" else "follow upstream license terms"
        commit = r.get("last_verified_commit") or ""
        lines.append(
            f"| `{r['id']}` | {r['name']} | {r['repo_url']} | `{r['license']}` | `{commit}` | {note} |"
        )
    lines.append("")
    return "\n".join(lines)


def cmd_validate(args: argparse.Namespace) -> int:
    errors, warnings = validate_inventory()
    payload = {"status": "OK" if not errors else "BROKEN", "errors": errors, "warnings": warnings}
    if args.json:
        print(json.dumps(payload, indent=2, sort_keys=True))
    else:
        for warning in warnings:
            print(f"WARNING\t{warning}")
        if errors:
            for error in errors:
                print(f"BROKEN\t{error}")
        else:
            print("OK\tinventory/resources.yaml")
    return 1 if errors else 0


def cmd_list(args: argparse.Namespace) -> int:
    resources = filter_resources(load_resources(), args)
    if args.json:
        print(json.dumps(resources, indent=2, sort_keys=True))
    else:
        for r in resources:
            print(f"{r['id']}\t{r['kind']}\t{r['priority']}\t{r['lifecycle']}\t{r['integration_status']}\t{r['name']}")
    return 0


def cmd_status(args: argparse.Namespace) -> int:
    resources = filter_resources(load_resources(), args)
    items = [repo_status(r) for r in resources]
    save_state({item["id"]: {"clone": item} for item in items})
    if args.json:
        print(json.dumps(items, indent=2, sort_keys=True))
    else:
        for item in items:
            dirty = "dirty" if item["dirty"] else "clean"
            print(f"{item['id']}\t{item['exists']}\t{item['remote']}\t{item['branch']}\t{item['commit']}\t{dirty}")
    return 0


def sync_allowed(resource: dict[str, Any], explicit: bool, include_non_default: bool) -> bool:
    if resource["lifecycle"] != "active":
        return False
    if resource["integration_status"] == "standalone" and valid_repo_url(resource["repo_url"]):
        return explicit or resource["priority"] == "core"
    return include_non_default and explicit and resource["integration_status"] in {"source-only", "reference-only", "partially-adopted"}


def select_sync(resources: list[dict[str, Any]], args: argparse.Namespace) -> tuple[list[dict[str, Any]], bool]:
    explicit = bool(args.id or args.category or args.priority)
    if args.all:
        selected = resources
        explicit = False
    else:
        selected = resources
        if args.id:
            selected = [r for r in selected if r["id"] == args.id]
        if args.category:
            selected = [r for r in selected if str(r["category"]).startswith(args.category)]
        if args.priority:
            selected = [r for r in selected if r["priority"] == args.priority]
    selected = [r for r in selected if sync_allowed(r, explicit, args.include_non_default)]
    return selected, explicit


def sync_one(resource: dict[str, Any], dry_run: bool) -> dict[str, Any]:
    repo = resource_path(resource, "upstream_path")
    parent = repo.parent
    status = repo_status(resource)
    before = status["commit"]
    if repo.exists() and not status["is_git_repo"]:
        return {"id": resource["id"], "status": "BROKEN", "detail": "repo path exists but is not a git repository", "before": before, "after": before}
    if status["is_git_repo"]:
        if status["remote"] != resource["repo_url"]:
            return {"id": resource["id"], "status": "BROKEN", "detail": "remote mismatch", "before": before, "after": before}
        if status["dirty"] or status["untracked"]:
            return {"id": resource["id"], "status": "SKIPPED", "detail": "dirty repo skipped", "before": before, "after": before}
        if dry_run:
            return {"id": resource["id"], "status": "DRY_RUN", "detail": "would fetch and fast-forward", "before": before, "after": before}
        fetch = run(["git", "-C", str(repo), "fetch", "origin", resource["default_ref"]])
        if fetch.returncode != 0:
            return {"id": resource["id"], "status": "BROKEN", "detail": fetch.stderr.strip(), "before": before, "after": before}
        merge = run(["git", "-C", str(repo), "merge", "--ff-only", "FETCH_HEAD"])
        after_status = repo_status(resource)
        if merge.returncode != 0:
            return {"id": resource["id"], "status": "BROKEN", "detail": merge.stderr.strip(), "before": before, "after": after_status["commit"]}
        return {"id": resource["id"], "status": "OK", "detail": "fast-forward checked", "before": before, "after": after_status["commit"]}
    if dry_run:
        return {"id": resource["id"], "status": "DRY_RUN", "detail": f"would clone {resource['repo_url']} to {rel(repo)}", "before": None, "after": None}
    parent.mkdir(parents=True, exist_ok=True)
    clone = run(["git", "clone", resource["repo_url"], str(repo)])
    after = repo_status(resource)
    if clone.returncode != 0:
        return {"id": resource["id"], "status": "BROKEN", "detail": clone.stderr.strip(), "before": None, "after": None}
    return {"id": resource["id"], "status": "OK", "detail": "cloned", "before": None, "after": after["commit"]}


def cmd_sync(args: argparse.Namespace) -> int:
    resources, _ = select_sync(load_resources(), args)
    results = [sync_one(r, args.dry_run) for r in resources]
    save_state({item["id"]: {"sync": item} for item in results})
    if args.json:
        print(json.dumps(results, indent=2, sort_keys=True))
    else:
        for item in results:
            print(f"{item['id']}\t{item['status']}\t{item['before']}\t{item['after']}\t{item['detail']}")
    return 1 if any(item["status"] == "BROKEN" for item in results) else 0


def cmd_doctor(args: argparse.Namespace) -> int:
    results = doctor_resources(load_resources(), args)
    if args.json:
        print(json.dumps(results, indent=2, sort_keys=True))
    else:
        for item in results:
            print(f"{item['id']}\t{item['status']}\t{item.get('detail', '')}")
    bad = any(item["status"] in {"MISSING", "BROKEN"} for item in results)
    return 1 if args.strict and bad else 0


def cmd_smoke(args: argparse.Namespace) -> int:
    results = smoke_resources(load_resources(), args)
    if args.json:
        print(json.dumps(results, indent=2, sort_keys=True))
    else:
        for item in results:
            print(f"{item['id']}\t{item['status']}\t{item.get('output') or ''}\t{item.get('detail', '')}")
    bad = any(item["status"] in {"MISSING", "BROKEN"} for item in results)
    return 1 if args.strict and bad else 0


def cmd_generate(args: argparse.Namespace) -> int:
    errors, _ = validate_inventory()
    if errors:
        for error in errors:
            print(f"BROKEN\t{error}", file=sys.stderr)
        return 1
    resources = load_resources()
    outputs = {
        ROOT / "RESOURCE_INDEX.md": generated_index(resources),
        ROOT / "LICENSE_AUDIT.md": generated_license(resources),
    }
    for path, text in outputs.items():
        path.write_text(text, encoding="utf-8")
        print(f"generated\t{rel(path)}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="ai-research-toolkit")
    sub = parser.add_subparsers(dest="command", required=True)
    for name in ["list", "status"]:
        p = sub.add_parser(name)
        p.add_argument("--kind")
        p.add_argument("--category")
        p.add_argument("--priority")
        p.add_argument("--support-status", dest="support_status")
        p.add_argument("--id")
        p.add_argument("--json", action="store_true")
        p.set_defaults(func=cmd_list if name == "list" else cmd_status)

    p = sub.add_parser("validate")
    p.add_argument("--json", action="store_true")
    p.set_defaults(func=cmd_validate)

    p = sub.add_parser("sync")
    group = p.add_mutually_exclusive_group(required=True)
    group.add_argument("--id")
    group.add_argument("--category")
    group.add_argument("--priority")
    group.add_argument("--all", action="store_true")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--include-non-default", action="store_true")
    p.add_argument("--json", action="store_true")
    p.set_defaults(func=cmd_sync)

    for name, func in [("doctor", cmd_doctor), ("smoke", cmd_smoke)]:
        p = sub.add_parser(name)
        p.add_argument("--strict", action="store_true")
        p.add_argument("--json", action="store_true")
        p.add_argument("--tool")
        p.add_argument("--all", action="store_true")
        p.set_defaults(func=func)

    p = sub.add_parser("generate")
    p.set_defaults(func=cmd_generate)
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
