#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import re
import subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
DOSSIER = HERE.parent
REPO = DOSSIER.parents[3]
RESOURCE_CANDIDATES = [
    os.environ.get("CHINESE_MATH_PDF_RESOURCE_DIR"),
    "/overflow/htzhu/mingcheng_new/render_resources/chinese_math_pdf",
    "/users/a/e/aereinh/render_resources/chinese_math_pdf",
]
VOLUMES = [
    "01_ARCHITECTURE_AND_COMPONENT_CONTRACT.md",
    "02_INCIDENTS_AND_CAUSAL_COVERAGE.md",
    "03_ALL_USER_QUESTIONS_AND_DECISIONS.md",
    "04_LUCERNA_FULL_WORKED_RUN.md",
]
APPENDIX_FILES = [
    ("附录A.1 Lucerna L01-L33 主账本", "04_SIX_REPO_AUDIT/LUCERNA.md"),
    ("附录A.2 Bobbio B01-B32 主账本", "04_SIX_REPO_AUDIT/BOBBIO.md"),
    ("附录A.3 Mica M01-M46 主账本", "04_SIX_REPO_AUDIT/MICA.md"),
    ("附录A.4 SeminarArc S01-S32 主账本", "04_SIX_REPO_AUDIT/SEMINARARC.md"),
    ("附录A.5 Asteria A01-A47 主账本", "04_SIX_REPO_AUDIT/ASTERIA.md"),
    ("附录A.6 CUHK Date C01-C56 主账本", "04_SIX_REPO_AUDIT/CUHK_DATE.md"),
    ("附录A.7 六仓库控制映射原始表", "04_SIX_REPO_AUDIT/problem-control-map.csv"),
    ("附录B Lucerna/Asteria 晚期补查 LX01-LX20 与 AX01-AX05", "05_PROPOSED_ARCHITECTURE_V0_2/INCIDENT_ADDENDUM.md"),
    ("附录C CARE 原始归因 C01-C40", "07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md"),
    ("附录D CARE 晚期谱系与因果追加登记", "08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/CARE_LINEAGE_AND_CAUSAL_AUDIT.md"),
]


def run(cmd: list[str], *, cwd: Path = REPO, env: dict[str, str] | None = None) -> None:
    subprocess.run(cmd, cwd=cwd, env=env, check=True)


def capture(cmd: list[str], *, cwd: Path = REPO) -> str:
    return subprocess.check_output(cmd, cwd=cwd, text=True).strip()


def resource_dir() -> Path:
    for candidate in RESOURCE_CANDIDATES:
        if candidate and Path(candidate).is_dir():
            return Path(candidate).resolve()
    raise SystemExit("blocked_missing_dependency: render_resources/chinese_math_pdf not found")


def demote_markdown(text: str, levels: int = 1) -> str:
    out = []
    for line in text.splitlines():
        match = re.match(r"^(#{1,6})(\s+.*)$", line)
        if match:
            hashes = "#" * min(6, len(match.group(1)) + levels)
            out.append(hashes + match.group(2))
        else:
            out.append(line)
    return "\n".join(out).rstrip() + "\n"


def csv_to_markdown_table(path: Path) -> str:
    rows = list(csv.reader(path.read_text(encoding="utf-8").splitlines()))
    if not rows:
        return ""
    header = rows[0]
    lines = ["| " + " | ".join(header) + " |", "| " + " | ".join(["---"] * len(header)) + " |"]
    for row in rows[1:]:
        cells = [(cell or "").replace("|", "\\|").replace("\n", " ") for cell in row]
        if len(cells) < len(header):
            cells += [""] * (len(header) - len(cells))
        lines.append("| " + " | ".join(cells[: len(header)]) + " |")
    return "\n".join(lines) + "\n"


def replace_mermaid(text: str, figures: list[str]) -> str:
    def repl(_: re.Match[str]) -> str:
        return figures.pop(0) if figures else ""
    return re.sub(r"```mermaid\n.*?\n```", repl, text, flags=re.S)


def write_graphs(fig_dir: Path) -> None:
    fig_dir.mkdir(parents=True, exist_ok=True)
    font = "Droid Sans Fallback"
    graphs = {
        "architecture_overview": f'''
digraph G {{
  graph [rankdir=TB, bgcolor="white", pad="0.2", nodesep="0.45", ranksep="0.55"];
  node [shape=box, style="rounded,filled", fillcolor="#F7F9FB", color="#4A5568", fontname="{font}", fontsize=13, margin="0.11,0.07"];
  edge [color="#334155", arrowsize=0.75, fontname="{font}", fontsize=11];
  U [label="用户一次任务\\n与有效授权"];
  A [label="研工台任务入口\\n识别目标、事实和执行所有者", fillcolor="#E8F3FF"];
  B [label="工作流与权限\\nBridge已安装模式或项目现有Codex入口"];
  C [label="专业派发\\n实际加载AI Skills领域能力"];
  E [label="主Codex\\n必要时有限开发子代理", fillcolor="#FFF7E6"];
  P [label="完整真实产物\\n程序、网页、模型、论文"];
  O [label="独立观察端\\n用户动作或科学计算原始事实"];
  V [label="独立要求与参考\\n候选实施者不能单改"];
  R [label="审查职责\\n代码忠实性与完整产物质量", fillcolor="#F4ECFF"];
  G [shape=diamond, label="必需结果\\n是否真正被证明", fillcolor="#FFFFFF"];
  F [label="归因并交回原职责\\n代码、设计、观察器或环境", fillcolor="#FFF1F2"];
  D [label="合法发布/交付入口\\n核对真实目标", fillcolor="#ECFDF5"];
  Q [label="实际用户收到当前版本\\n或明确未交付原因", fillcolor="#ECFDF5"];
  U -> A; A -> B; A -> C; B -> E; C -> E; E -> P; P -> O; A -> V; O -> R; V -> R; R -> G;
  G -> F [label="否"]; F -> E; G -> D [label="是"]; D -> Q;
}}
''',
        "risk_routing": f'''
digraph G {{
  graph [rankdir=TB, bgcolor="white", pad="0.2", nodesep="0.45", ranksep="0.55"];
  node [shape=box, style="rounded,filled", fillcolor="#F8FAFC", color="#4A5568", fontname="{font}", fontsize=13, margin="0.11,0.07"];
  edge [color="#334155", arrowsize=0.75, fontname="{font}", fontsize=11];
  S [label="当前任务按风险分流", fillcolor="#E8F3FF"];
  L [shape=diamond, label="影响范围\\n与成本", fillcolor="#FFFFFF"];
  X [label="明确单点小改\\n主Codex + 局部相关回归"];
  Y [label="完整新用户功能/科学方法\\n专业设计/参考 → 主实现 → 第一条正式链 → 内部QA"];
  Z [label="改变正式权限/算法架构/高成本与发布\\n已有独立Planner/Critic或Bridge Control + 真隔离"];
  Q [label="准入\\n只验证本轮受影响的真实能力", fillcolor="#ECFDF5"];
  U [shape=diamond, label="真正未解决事项", fillcolor="#FFFFFF"];
  R [label="代码/工具/证据\\n原任务自己修，按影响重查"];
  P [label="需求/科学方向改变\\nPlanner提案后再审"];
  H [label="实质新目标/费用/私人权限\\n向用户请一次必要授权"];
  D [label="无阻塞\\n核对并交付当前精确对象", fillcolor="#ECFDF5"];
  S -> L; L -> X [label="小改"]; L -> Y [label="完整功能"]; L -> Z [label="高风险"];
  X -> Q; Y -> Q; Z -> Q; Q -> U; U -> R; U -> P; U -> H; U -> D;
}}
''',
        "lucerna_run": f'''
digraph G {{
  graph [rankdir=TB, bgcolor="white", pad="0.2", nodesep="0.35", ranksep="0.45"];
  node [shape=box, style="rounded,filled", fillcolor="#F8FAFC", color="#4A5568", fontname="{font}", fontsize=12, margin="0.10,0.06"];
  edge [color="#334155", arrowsize=0.7, fontname="{font}", fontsize=10];
  A [label="一次交办\\nR2阈值提醒目标", fillcolor="#E8F3FF"];
  B [label="冻结目标\\n阈值、未知值、去重、保存/取消、旧服务"];
  C [label="专业设计与文案\\n真实托盘结构和自然中文状态"];
  D [label="主Codex集成\\nE1阈值逻辑 + E2设置交互"];
  E [label="首条生产链\\nCloudflareR2Provider → 聚合 → 通知"];
  F [label="低成本回归\\n正常、错误、重启、相邻服务"];
  G [label="隔离原生观察\\nexe/PID/窗口/动作/后置证据"];
  H [label="独立审查/GPT Work\\n完整候选与未知缺陷"];
  I [label="用户或发布owner\\n必要取舍、安装和真实版本核对", fillcolor="#ECFDF5"];
  X [label="失败归因\\n代码/设计/观察器/环境/授权", fillcolor="#FFF1F2"];
  A -> B -> C -> D -> E -> F -> G -> H -> I;
  E -> X [label="未接真实链"]; F -> X [label="旧行为断裂"]; G -> X [label="观察器或环境错"]; H -> X [label="整体质量缺陷"];
  X -> D [label="代码/集成"]; X -> C [label="设计/文案"]; X -> G [label="观察器/环境"];
}}
''',
        "model_acceptance": f'''
digraph G {{
  graph [rankdir=TB, bgcolor="white", pad="0.2", nodesep="0.35", ranksep="0.45"];
  node [shape=box, style="rounded,filled", fillcolor="#F8FAFC", color="#4A5568", fontname="{font}", fontsize=12, margin="0.10,0.06"];
  edge [color="#334155", arrowsize=0.7, fontname="{font}", fontsize=10];
  A [label="原科学/产品合同\\n公式、数据、人群、阶段"];
  B [label="独立参考\\n数值、梯度、好/坏/缺测样本", fillcolor="#F4ECFF"];
  C [label="首条真实forward/消费者\\n数据loader、权重、loss或UI路径"];
  D [label="廉价忠实性探针\\n确认真实资源影响最终结果"];
  E [label="正式训练/评价/原生验收\\n只在前置链闭合后消耗高成本"];
  F [shape=diamond, label="结果含义\\n是否真实可判", fillcolor="#FFFFFF"];
  G [label="正确负结果/NO_GO\\n按合同诚实停止", fillcolor="#ECFDF5"];
  H [label="实现或观察器返修\\n不把假指标包装为通过", fillcolor="#FFF1F2"];
  I [label="发布/交付声明\\n只覆盖已证明范围", fillcolor="#ECFDF5"];
  A -> B -> C -> D -> E -> F;
  F -> G [label="科学负结果"]; F -> H [label="实现/测量不忠实"]; H -> C; F -> I [label="完整证明"];
}}
''',
    }
    for name, dot in graphs.items():
        dot_path = fig_dir / f"{name}.dot"
        pdf_path = fig_dir / f"{name}.pdf"
        dot_path.write_text(dot.strip() + "\n", encoding="utf-8")
        run(["dot", "-Tpdf", str(dot_path), "-o", str(pdf_path)])


def source_link(rel: str, commit: str) -> str:
    return f"https://github.com/YuukiAS/AI_Research_Toolkit/blob/{commit}/docs/research/software-production/{rel}"


def build_markdown(commit: str) -> str:
    parts: list[str] = []
    parts.append('''---
title: "研工台复杂产物生产体系"
subtitle: "四卷正式研究报告与逐项证据附录（v0.6）"
author: "YuukiAS / AI_Research_Toolkit"
date: "2026-10-13"
---

\\newpage

# 版本、范围与阅读边界 {-}

本报告由 `docs/research/software-production/09_FULL_DOSSIER_V0_6/05_CODEX_PDF_BUILD_PROMPT.md` 指定的排版合同生成。正文完整收录四卷研究文本，附录从仓库现有六份问题账本、Lucerna/Asteria 晚期补查、CARE 两批原始归因和六仓库控制映射生成。本文是正式中文排版交付，不改变科学结论、事故严重性、证据强度或“已验证/尚未验证”的边界。

计数口径必须按原文理解：六仓库主账本 L01-L33、B01-B32、M01-M46、S01-S32、A01-A47、C01-C56 合计 246 条登记，但不是 246 次独立事故；LX01-LX20 与 AX01-AX05 是晚期补查，不直接加成 271 次事故；CARE C01-C40 与后续谱系追加登记同样含跨阶段复发、设计风险、历史重叠和未穷尽边界。

\\newpage
''')
    fig_md = [
        "![研工台任务与责任闭环（按第一卷原 Mermaid 图重绘为矢量图）](figures/architecture_overview.pdf){width=0.96\\textwidth}\n",
        "![风险分流与失败归属（按第一卷原 Mermaid 图重绘为矢量图）](figures/risk_routing.pdf){width=0.93\\textwidth}\n",
    ]
    for filename in VOLUMES:
        text = (DOSSIER / filename).read_text(encoding="utf-8")
        if filename == "01_ARCHITECTURE_AND_COMPONENT_CONTRACT.md":
            text = replace_mermaid(text, fig_md.copy())
        parts.append(text.rstrip() + "\n")
        if filename == "04_LUCERNA_FULL_WORKED_RUN.md":
            parts.append("\n![Lucerna R2 阈值提醒演练中的职责流与返修归属（根据第四卷阶段表生成）](figures/lucerna_run.pdf){width=0.98\\textwidth}\n\n")
    parts.append('''
# 补充图：模型与正式验收时序

下图把第二卷和第三卷反复强调的 CARE/科研模型准入关系可视化：先有原科学合同和独立参考，再让真实数据、权重、损失或用户路径进入第一条正式消费者；高成本训练、正式验收和发布声明只能在前置链闭合后发生。它不新增事实，只帮助阅读者避免把“有模块形状”“有训练步数”或“有回执”误读为真实完成。

![模型、真实数据与正式验收的时序边界（根据第二卷 CARE 根因族与第三卷验收问答生成）](figures/model_acceptance.pdf){width=0.98\\textwidth}

\\appendix

# 逐项证据附录

本附录按原仓库现有材料生成，尽量保留原编号、来源定位、证据状态和对应控制。附录中的历史记录、边界、风险、检查缺口和已修问题不得被重新解释为当前仍开放的同等故障，也不得合并成独立事故数量。
''')
    base = DOSSIER.parent
    for title, rel in APPENDIX_FILES:
        path = base / rel
        parts.append(f"\n## {title}\n\n")
        parts.append(f"原始来源：[{rel}]({source_link(rel, commit)})。\n\n")
        if path.suffix == ".csv":
            parts.append(csv_to_markdown_table(path))
        else:
            parts.append(demote_markdown(path.read_text(encoding="utf-8"), 2))
    return "\n".join(parts).replace("scar∪edema", "scar 与 edema 的并集").replace("scar ∪ edema", "scar 与 edema 的并集").replace("∪", "并集")


def compute_counts() -> dict[str, object]:
    base = DOSSIER.parent
    series = {"L": "04_SIX_REPO_AUDIT/LUCERNA.md", "B": "04_SIX_REPO_AUDIT/BOBBIO.md", "M": "04_SIX_REPO_AUDIT/MICA.md", "S": "04_SIX_REPO_AUDIT/SEMINARARC.md", "A": "04_SIX_REPO_AUDIT/ASTERIA.md", "C": "04_SIX_REPO_AUDIT/CUHK_DATE.md"}
    counts: dict[str, object] = {}
    for prefix, rel in series.items():
        text = (base / rel).read_text(encoding="utf-8")
        ids = sorted({int(x) for x in re.findall(rf"\b{prefix}(\d{{2}})\b", text)})
        counts[prefix] = {"count": len(ids), "first": f"{prefix}{ids[0]:02d}", "last": f"{prefix}{ids[-1]:02d}", "missing": [i for i in range(1, ids[-1] + 1) if i not in ids]}
    add = (base / "05_PROPOSED_ARCHITECTURE_V0_2/INCIDENT_ADDENDUM.md").read_text(encoding="utf-8")
    for prefix in ("LX", "AX"):
        ids = sorted({int(x) for x in re.findall(rf"\b{prefix}(\d{{2}})\b", add)})
        counts[prefix] = {"count": len(ids), "first": f"{prefix}{ids[0]:02d}", "last": f"{prefix}{ids[-1]:02d}", "missing": [i for i in range(1, ids[-1] + 1) if i not in ids]}
    care = (base / "07_CARE_AND_EXECUTABLE_REVIEW_V0_4/CARE_FAILURE_LEDGER.md").read_text(encoding="utf-8")
    care_ids = sorted({int(x) for x in re.findall(r"\bC(\d{2})\b", care)})
    counts["CARE_C"] = {"count": len(care_ids), "first": f"C{care_ids[0]:02d}", "last": f"C{care_ids[-1]:02d}", "missing": [i for i in range(1, care_ids[-1] + 1) if i not in care_ids]}
    lineage = (base / "08_COMPLEX_ARTIFACT_WORKFLOW_V0_5/CARE_LINEAGE_AND_CAUSAL_AUDIT.md").read_text(encoding="utf-8")
    lineage_ids = re.findall(r"\| ((?:RB04|B7|MM|DG|PR|RACE|FLOW|DEPLOY|META)-\d{2})\b", lineage)
    counts["CARE_LINEAGE"] = {"count_including_meta": len(lineage_ids), "specified追加登记_count_excluding_meta": sum(1 for item in lineage_ids if not item.startswith("META-")), "ids": lineage_ids}
    counts["six_repo_total"] = sum(int(counts[p]["count"]) for p in series)
    return counts


def write_manifest(path: Path, commit: str, counts: dict[str, object]) -> None:
    inputs = [str(DOSSIER / f) for f in VOLUMES]
    inputs += [str(DOSSIER.parent / rel) for _, rel in APPENDIX_FILES]
    path.write_text(json.dumps({"commit": commit, "inputs": inputs, "counts": counts}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def resolve_header(resource: Path) -> Path:
    build_dir = HERE / "build"
    build_dir.mkdir(exist_ok=True)
    header_path = build_dir / "preamble.tex"
    header_path.write_text((HERE / "preamble.tex.in").read_text(encoding="utf-8").replace("__RESOURCE_DIR__", str(resource)), encoding="utf-8")
    return header_path


def compile_pdf(markdown: Path, output: Path, resource: Path, header: Path) -> None:
    build_dir = HERE / "build"
    env = os.environ.copy()
    env["TEXMFHOME"] = str(resource / "texmf")
    env["TEXMFVAR"] = str(build_dir / "texmf-var")
    env["TEXMFCONFIG"] = str(build_dir / "texmf-config")
    env["TEXMFCACHE"] = str(build_dir / "texmf-cache")
    env["OSFONTDIR"] = f"{resource / 'fonts'}//:{resource / 'texmf/fonts/opentype'}//"
    for key in ("TEXMFVAR", "TEXMFCONFIG", "TEXMFCACHE"):
        Path(env[key]).mkdir(parents=True, exist_ok=True)
    output.parent.mkdir(parents=True, exist_ok=True)
    run(["pandoc", str(markdown), "-o", str(output), "--pdf-engine=xelatex", "--standalone", "--toc", "--toc-depth=3", "--number-sections", "--resource-path", str(HERE), "-V", "papersize:a4", "-V", "fontsize=11pt", "-H", str(header)], env=env)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--compile", action="store_true")
    args = parser.parse_args()
    write_graphs(HERE / "figures")
    commit = capture(["git", "rev-parse", "HEAD"])
    counts = compute_counts()
    markdown_path = HERE / "workflow_architecture_dossier_v0.6.md"
    markdown_path.write_text(build_markdown(commit), encoding="utf-8")
    write_manifest(HERE / "input_manifest.json", commit, counts)
    resource = resource_dir()
    header = resolve_header(resource)
    if args.compile:
        output = DOSSIER / "exports" / "workflow_architecture_dossier_v0.6.pdf"
        compile_pdf(markdown_path, output, resource, header)
        print(f"PDF={output}")
        print(f"SHA256={hashlib.sha256(output.read_bytes()).hexdigest()}")
        print(f"RESOURCE_DIR={resource}")
    else:
        print(markdown_path)


if __name__ == "__main__":
    main()
