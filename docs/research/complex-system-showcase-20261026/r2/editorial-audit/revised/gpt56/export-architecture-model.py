from __future__ import annotations

import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT = ROOT.parent / "ARCHITECTURE_MODEL.md"


def load_model() -> dict:
    code = (
        "global.window={};"
        f"require({json.dumps(str(ROOT / 'architecture-data.js'))});"
        "process.stdout.write(JSON.stringify(window.DA_MODEL));"
    )
    result = subprocess.run(["node", "-e", code], check=True, capture_output=True, text=True)
    return json.loads(result.stdout)


def esc(text: str) -> str:
    return text.replace("|", "\\|").replace("\n", " ")


def main() -> None:
    model = load_model()
    lines: list[str] = []
    lines.extend([
        "# Delivery Assurance 完整架构模型",
        "",
        "本文件描述展示网站采用的目标架构。当前 Codex 仍是实现与返修负责人；项目验收程序提供专业观察；Delivery Assurance 核对本次承诺、原有功能和证据资格；Bridge Kit 负责身份、运行边界与失败递送。该分工已经形成设计方案，但独立插件、普通入口接线和七个项目启用尚未实施。",
        "",
        "交互原型的唯一机器数据源是 `prototype/architecture-data.js`。本文件由同一数据源生成，避免文档与网页各写一套架构。",
        "",
        "## 必须保持的分工",
        "",
        "1. 当前 Codex 负责理解请求、实现、修复和调用专业能力。Delivery Assurance 不接管实现。",
        "2. 项目验收程序掌握医学、统计、界面、设备和数据等专业标准。通用交付层不能发明这些阈值。",
        "3. Bridge Kit 绑定任务、候选和运行身份，并把失败送回合法接收者。它不签发产品完成结论。",
        "4. 原有可用功能是本次交付的一等输入。新增用例通过时，回归仍可阻止交付。",
        "5. 成功和失败都必须有实际接收者。只生成文件、状态或报告，不等于结果已被消费。",
        "6. 设计状态和运行状态分开记录。目标架构不能被写成已经部署的生产能力。",
        "",
        "## 组件",
        "",
    ])

    for node in model["nodes"]:
        lines.extend([
            f"### {node['label']} — {node['statusLabel']}",
            "",
            node["summary"],
            "",
        ])
        for term, value in node["details"]:
            lines.append(f"- **{term}：** {value}")
        lines.append("")

    lines.extend([
        "## 通信关系",
        "",
        "每条连接都说明传递内容、触发条件、实际接收者、怎样算接通和当前缺口。图上的箭头不作为装饰。",
        "",
    ])
    for index, edge in enumerate(model["edges"], start=1):
        from_label = next(n["label"] for n in model["nodes"] if n["id"] == edge["from"])
        to_label = next(n["label"] for n in model["nodes"] if n["id"] == edge["to"])
        state = {"existing": "已有", "partial": "部分已有", "pending": "待接线"}.get(edge["state"], edge["state"])
        lines.extend([
            f"### {index}. {from_label} → {to_label}：{edge['label']}（{state}）",
            "",
            f"- **传递内容：** {edge['payload']}",
            f"- **何时发生：** {edge['trigger']}",
            f"- **实际接收者：** {edge['consumer']}",
            f"- **怎样算接通：** {edge['success']}",
            f"- **当前缺口：** {edge['gap']}",
            "",
        ])

    lines.extend([
        "## 三条运行路径",
        "",
    ])
    node_map = {node["id"]: node["label"] for node in model["nodes"]}
    for scenario_id, scenario in model["scenarios"].items():
        ordered = sorted(scenario["steps"], key=lambda item: item[1])
        path = " → ".join(node_map[node_id] for node_id, _ in ordered)
        lines.extend([
            f"### {scenario['title']}",
            "",
            scenario["summary"],
            "",
            f"路径：{path}。",
            "",
            f"{scenario['next']}。",
            "",
        ])

    lines.extend([
        "## Lucerna 首个否决试验",
        "",
        "第一项实施试验应绑定同一个 Lucerna 候选，同时运行四类对照：未观测状态保持中性、确认故障仍然提示、原有可用路线保持可用，以及缺少当前候选证据时不能放行。失败必须经过 Bridge Kit 回到原 Codex，并观察到接收和后续修复；修复后重新运行同一批检查。",
        "",
        "只要出现以下任一情况，就撤回公共交付层，继续采用项目内加固：失败报告仍需用户手工搬运；原有功能没有进入同一批义务；候选身份、运行对象和截图无法绑定；普通结束入口仍可绕过结果。",
        "",
        "## 已知边界",
        "",
        "- workflow-core 的路由规范已经存在，但跨插件输出是否被实际消费仍需正常入口证明。",
        "- Bridge Kit 已有身份、运行和恢复能力，面向 Delivery Assurance 的普通入口钩子与回执尚未正式接通。",
        "- Lucerna 等项目已有专业运行器，覆盖和成熟度并不一致。",
        "- 独立复核只在高风险语义、重要观察器或正式独立验收时按需调用。创建审查文件不等于复核者已经运行。",
        "- 自动发现未知的动态影响边无法得到绝对保证；系统必须保留覆盖缺口，而非把未知写成通过。",
        "- 本轮不实施 Delivery Assurance，不修改任何生产系统，也不发布正式网站。",
        "",
    ])

    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
