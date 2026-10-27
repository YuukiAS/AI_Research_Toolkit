from __future__ import annotations

import csv
import json
import subprocess
from pathlib import Path
from typing import Iterable

from bs4 import BeautifulSoup, NavigableString, Tag

ROOT = Path(__file__).resolve().parent
OUT = ROOT.parent / "COPY_EDITORIAL_AUDIT.tsv"


def clean(text: str) -> str:
    return " ".join(text.split())


def add(rows: list[dict[str, str]], *, audit_id: str, surface: str, location: str,
        original: str, decision: str, final: str, reason: str, protected: str = "") -> None:
    rows.append({
        "id": audit_id,
        "surface": surface,
        "location_or_state": location,
        "original_copy": clean(original),
        "decision": decision,
        "final_copy": clean(final),
        "reason": clean(reason),
        "protected_meaning": clean(protected),
    })


def model_data() -> dict:
    code = (
        "global.window={};"
        f"require({json.dumps(str(ROOT / 'architecture-data.js'))});"
        "process.stdout.write(JSON.stringify(window.DA_MODEL));"
    )
    result = subprocess.run(["node", "-e", code], check=True, capture_output=True, text=True)
    return json.loads(result.stdout)


def element_location(tag: Tag) -> str:
    bits = [tag.name]
    if tag.get("id"):
        bits.append(f"#{tag['id']}")
    classes = tag.get("class", [])
    if classes:
        bits.extend(f".{item}" for item in classes)
    line = getattr(tag, "sourceline", None)
    return f"index.html:{line or '?'}:{''.join(bits)}"


def static_reason(tag: Tag, text: str) -> str:
    if tag.name in {"title", "meta"}:
        return "浏览器身份或页面摘要需要准确说明原型对象。"
    if tag.name in {"a", "button"}:
        return "直接指向真实页面位置、情境或来源，属于必要操作文字。"
    if tag.name in {"h1", "h2", "h3"}:
        return "标题直接说明读者在本段要理解的机制或判断，没有额外口号。"
    if tag.name in {"dt", "dd"}:
        return "该字段用于比较架构路线、投入或状态，删去会丢失判断依据。"
    if tag.name in {"li"}:
        return "该项属于实际步骤、状态或约束，列表比连续段落更便于核对。"
    if "section-label" in tag.get("class", []):
        return "短标签用于定位内容层级，不承担宣传作用。"
    if "case-kind" in tag.get("class", []):
        return "区分历史事实、故意错误候选和旧功能保护，防止证据混淆。"
    if "case-boundary" in tag.get("class", []):
        return "紧邻案例写明证据边界，避免把推演写成已完成结果。"
    if "header-state" in tag.get("class", []) or "scope-statement" in tag.get("class", []):
        return "必须明确设计状态与尚未实施的范围，防止原型被误读为生产能力。"
    if "diagram-note" in tag.get("class", []) or "keyboard-help" in tag.get("class", []):
        return "说明线型或键盘操作，直接帮助读图和使用交互。"
    return "该句提供理解架构、案例、取舍或证据边界所需的信息，未与邻近文字重复。"


def main() -> None:
    rows: list[dict[str, str]] = []

    r1_items = [
        ("R1-01", "gpt6 首屏", "R1 标题", "系统观察室", "DELETE", "", "新造品牌名遮住了展示对象，也增加读者记忆负担。"),
        ("R1-02", "gpt6 首屏", "R1 主标题", "交付之前，先证明它做到了。", "DELETE", "", "口号没有告诉读者系统由哪些组件构成，首屏位置改给完整架构图。"),
        ("R1-03", "gpt6 首屏", "R1 横幅", "判断一次交付，需要连起原始要求、当前成品、专业证据、接收与返修。", "MERGE", "原始要求、当前 Codex、项目验收、Delivery Assurance、Bridge Kit 和结果接收者直接画进架构图。", "句意有用，但不再单独保留抽象总结。"),
        ("R1-04", "gpt6 情境区", "R1 章节标题", "同一个要求，三种结果。", "REWRITE", "正常交付／验收失败，返回原任务／新修复破坏旧功能", "直接命名三条路径，比概括式标题更快说明交互作用。"),
        ("R1-05", "gpt6 组件区", "R1 章节标题", "一次交付，谁对什么负责。", "MERGE", "节点详情直接列出为什么存在、需要什么、交出什么、谁接收和少了会怎样。", "责任关系保留在可操作的组件检查器中，不再做口号。"),
        ("R1-06", "gpt6 证据区", "R1 章节标题", "把证据放在它能证明的位置。", "DELETE", "", "比喻式表达没有增加证据层级信息，改由具体状态和边界说明。"),
        ("R1-07", "gpt6 决策卡", "R1 小标题", "证据齐全，才可交付", "REWRITE", "所有必需义务具有合格证据后，交付结论进入最终使用路径。", "补出主语、条件和接收路径，避免泛化口号。"),
        ("R1-08", "gpt6 组件区", "R1 旁白", "判断能否交付，需要专业证据；产生失败意见，还需要有人接收。", "MERGE", "项目验收程序产生专业结果；Delivery Assurance 判断范围；Bridge Kit 把失败送回原任务。", "有用关系改成三条明确连接，不另留重复旁白。"),
        ("R1-09", "gpt5.6 首屏", "R1 主标题", "交付之前，先确认任务真的完成了。", "REWRITE", "一次交付怎样完成验收、返修和复验", "新标题直接说页面展示的流程，避免宣传式提醒。"),
        ("R1-10", "gpt5.6 导航", "R1 导航", "任务怎样被接住", "REWRITE", "架构", "导航只说明目的地，不把内部流程包装成悬念。"),
        ("R1-11", "gpt5.6 导航", "R1 导航", "组件为什么存在", "REWRITE", "架构", "组件说明已在同一架构工作台中，独立导航会重复。"),
        ("R1-12", "gpt5.6 导航", "R1 导航", "证据到哪一步", "REWRITE", "证据", "保留信息目的，去掉问答式包装。"),
        ("R1-13", "gpt5.6 首屏", "R1 眉题", "交付保障系统 · 第一版完整样例", "DELETE", "", "内部版本和自我评价不帮助读者理解系统。"),
        ("R1-14", "gpt5.6 流程", "R1 阶段名", "义务收束", "REWRITE", "核对交付义务和证据", "原词像内部项目术语；改成读者可直接理解的动作。"),
        ("R1-15", "gpt5.6 组件区", "R1 标题", "每个组件只拥有一项不可替代的责任", "DELETE", "", "过强且没有必要；组件本身已经展示各自责任和边界。"),
        ("R1-16", "gpt5.6 证据区", "R1 标题", "相信到哪一步，只由证据类型决定", "REWRITE", "先用一条真实任务判断这套架构值不值得继续", "改成可证伪的实施判断，减少宣言式语气。"),
    ]
    for item in r1_items:
        add(rows, audit_id=item[0], surface=item[1], location=item[2], original=item[3], decision=item[4], final=item[5], reason=item[6])

    draft_items = [
        ("DRAFT-01", "R2 首屏", "主标题", "一次交付怎样被验收、退回和重新证明", "REWRITE", "一次交付怎样完成验收、返修和复验", "改成常用工程词，读者不需要解释“重新证明”。"),
        ("DRAFT-02", "R2 首屏", "状态标题", "当前边界", "REWRITE", "目前做到哪一步", "状态标题改成普通中文，不用报告式抽象名词。"),
        ("DRAFT-03", "R2 导航", "导航", "取舍", "REWRITE", "方案比较", "目的地更明确，避免让读者猜内容。"),
        ("DRAFT-04", "R2 架构图", "节点", "已接受的旧功能", "REWRITE", "原有可用功能", "语义不变，但更接近日常产品表达。"),
        ("DRAFT-05", "R2 检查器", "字段", "权威输入", "REWRITE", "需要什么", "普通读者无需先理解“权威输入”这一内部合同词。"),
        ("DRAFT-06", "R2 检查器", "字段", "成立标志", "REWRITE", "怎样算接通", "连接检查需要说明实际可观察结果，口语更直接。"),
    ]
    for item in draft_items:
        add(rows, audit_id=item[0], surface=item[1], location=item[2], original=item[3], decision=item[4], final=item[5], reason=item[6])

    html = (ROOT / "index.html").read_text(encoding="utf-8")
    soup = BeautifulSoup(html, "html.parser")
    index = 1
    for node in soup.find_all(string=True):
        if not isinstance(node, NavigableString):
            continue
        parent = node.parent
        if not isinstance(parent, Tag) or parent.name in {"script", "style"}:
            continue
        text = clean(str(node))
        if not text:
            continue
        add(
            rows,
            audit_id=f"HTML-{index:03d}",
            surface="完整网站",
            location=element_location(parent),
            original=text,
            decision="KEEP",
            final=text,
            reason=static_reason(parent, text),
            protected="产品状态、版本边界、项目名、组件名、数值和来源链接不得改义。",
        )
        index += 1

    # Accessible labels and browser metadata that may not appear as ordinary text nodes.
    attr_index = 1
    for tag in soup.find_all(True):
        for attr in ("aria-label", "title", "content"):
            if attr not in tag.attrs:
                continue
            if attr == "content" and tag.name != "meta":
                continue
            text = clean(str(tag.get(attr, "")))
            if not text:
                continue
            add(
                rows,
                audit_id=f"A11Y-{attr_index:03d}",
                surface="浏览器与辅助技术",
                location=f"{element_location(tag)}@{attr}",
                original=text,
                decision="KEEP",
                final=text,
                reason="用于页面身份、键盘或屏幕阅读器理解；内容与可见界面一致。",
                protected="不得夸大实施状态或改变实际操作后果。",
            )
            attr_index += 1

    model = model_data()
    node_index = 1
    for node in model["nodes"]:
        fields = [
            ("label", node["label"], "组件或对象的稳定名称，用于图和检查器一致定位。"),
            ("subtitle", node["subtitle"], "在不展开详情时说明该节点的唯一作用。"),
            ("statusLabel", node["statusLabel"], "区分已有、建议新增、部分具备和待实测，不能省略成熟度。"),
            ("summary", node["summary"], "选中节点后先给一段完整职能说明，避免读者从字段自行拼接。"),
        ]
        for field, text, reason in fields:
            add(rows, audit_id=f"NODE-{node_index:03d}", surface="架构节点", location=f"{node['id']}.{field}", original=text, decision="KEEP", final=text, reason=reason, protected="组件身份、责任边界和成熟度不得改义。")
            node_index += 1
        for detail_index, (term, value) in enumerate(node["details"], start=1):
            add(rows, audit_id=f"NODE-{node_index:03d}", surface="节点详情", location=f"{node['id']}.details[{detail_index}].term", original=term, decision="KEEP", final=term, reason="该字段对应任务要求的责任、输入、输出、接收者、反事实或状态。", protected="字段含义必须与架构模型一致。")
            node_index += 1
            add(rows, audit_id=f"NODE-{node_index:03d}", surface="节点详情", location=f"{node['id']}.details[{detail_index}].value", original=value, decision="KEEP", final=value, reason="说明这一节点为何存在以及删去后的实际后果，属于架构理解所需正文。", protected="不能把设计写成已实施，也不能改变组件所有权。")
            node_index += 1

    edge_index = 1
    edge_reasons = {
        "label": "图上需要短名称区分每条通信关系。",
        "payload": "明确传递的数据或信息，避免只画无语义箭头。",
        "trigger": "说明这条连接何时实际发生。",
        "consumer": "明确实际接收者，防止结果只落盘无人处理。",
        "success": "给出可观察的接通条件，交互不只是装饰。",
        "gap": "保留尚未实现或尚未证明的边界。",
    }
    for edge in model["edges"]:
        for field in ("label", "payload", "trigger", "consumer", "success", "gap"):
            text = edge[field]
            add(rows, audit_id=f"EDGE-{edge_index:03d}", surface="架构连接", location=f"{edge['id']}.{field}", original=text, decision="KEEP", final=text, reason=edge_reasons[field], protected="传递对象、触发条件、接收者和证据状态必须与架构模型一致。")
            edge_index += 1

    scenario_index = 1
    for scenario_id, scenario in model["scenarios"].items():
        for field, reason in (
            ("title", "直接命名当前运行路径。"),
            ("summary", "说明这条路径为什么结束、返修或拒绝交付。"),
            ("next", "显示下一位实际接收者，使切换产生可操作的信息。"),
        ):
            text = scenario[field]
            add(rows, audit_id=f"SCENARIO-{scenario_index:03d}", surface="情境交互", location=f"{scenario_id}.{field}", original=text, decision="KEEP", final=text, reason=reason, protected="路径结果和接收者不得改义。")
            scenario_index += 1

    dynamic = [
        ("DYN-01", "手机路径", "mobile.path.heading", "当前路径", "标明手机端按顺序重排的是当前情境，不是完整节点清单。"),
        ("DYN-02", "手机路径", "mobile.other.heading", "其它组件", "把不在当前路径上的节点保留为可选详情，避免误以为已从架构删除。"),
        ("DYN-03", "辅助交互", "mobile.node.aria", "查看 {组件名}", "屏幕阅读器需要明确按钮后果。"),
        ("DYN-04", "节点检查器", "inspector.type.optional", "按需能力", "区分非必经能力。"),
        ("DYN-05", "节点检查器", "inspector.type.input", "输入", "区分事实或基线输入。"),
        ("DYN-06", "节点检查器", "inspector.type.output", "结果接收者", "区分最终消费端。"),
        ("DYN-07", "节点检查器", "inspector.type.component", "组件", "普通架构节点的中性类型名。"),
        ("DYN-08", "连接检查器", "inspector.type.edge", "连接", "说明当前查看的是通信关系。"),
        ("DYN-09", "连接检查器", "inspector.edge.existing", "已有路径", "准确区分当前已存在的通信。"),
        ("DYN-10", "连接检查器", "inspector.edge.partial", "部分已有", "保留已有底层能力与未完成接线的差异。"),
        ("DYN-11", "连接检查器", "inspector.edge.pending", "待接线", "明确尚未实施。"),
        ("DYN-12", "连接检查器", "inspector.edge.payload", "传递内容", "对应任务要求中的数据或信息。"),
        ("DYN-13", "连接检查器", "inspector.edge.trigger", "何时发生", "对应触发条件。"),
        ("DYN-14", "连接检查器", "inspector.edge.consumer", "实际接收者", "区分文件落盘与结果被消费。"),
        ("DYN-15", "连接检查器", "inspector.edge.success", "怎样算接通", "要求交互显示可观察的成功条件。"),
        ("DYN-16", "连接检查器", "inspector.edge.gap", "当前缺口", "防止把目标架构写成生产现状。"),
        ("DYN-17", "无障碍通知", "announcement.node", "已选择组件：{组件名}。{组件摘要}", "键盘和屏幕阅读器用户需要知道选择结果。"),
        ("DYN-18", "无障碍通知", "announcement.edge", "已选择连接：{连接名}。{传递内容}", "键盘和屏幕阅读器用户需要知道选择结果。"),
        ("DYN-19", "无障碍通知", "announcement.scenario", "已切换到{情境名}。{情境摘要}", "切换情境后必须反馈真实状态变化。"),
        ("DYN-20", "图内状态", "edge.pending", "待接线", "每条未完成连接在图内直接标明，不能只靠图例猜测。"),
    ]
    for audit_id, surface, location, text, reason in dynamic:
        add(rows, audit_id=audit_id, surface=surface, location=location, original=text, decision="KEEP", final=text, reason=reason, protected="交互后果和实施状态不得改义。")

    with OUT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]), delimiter="\t", lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)

    print(f"wrote {len(rows)} rows to {OUT}")


if __name__ == "__main__":
    main()
