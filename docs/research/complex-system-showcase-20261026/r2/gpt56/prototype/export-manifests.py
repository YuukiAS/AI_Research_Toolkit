from __future__ import annotations

import hashlib
import json
from pathlib import Path

import struct

ROOT = Path(__file__).resolve().parent
DELIVERY_ROOT = ROOT.parent
PREVIEWS = DELIVERY_ROOT / "previews"

SOURCE_FILES = [
    "index.html",
    "architecture-data.js",
    "app.js",
    "styles.css",
    "verify.py",
    "export-copy-audit.py",
    "export-architecture-model.py",
    "export-manifests.py",
    "README.md",
]

SCREENSHOTS = [
    ("desktop-architecture.png", "1600 × 1000", "正常交付，默认全图", "完整架构首屏；没有节点被默认淡化。"),
    ("desktop-component-bridge.png", "1600 × 1000", "正常交付，选中 Bridge Kit", "展示节点上下游高亮和责任检查器。"),
    ("desktop-failure-path.png", "1600 × 1000", "验收失败，返回原任务", "橙色返修回路与其余架构同时可见。"),
    ("desktop-connection-detail.png", "1600 × 1000", "验收失败，选中专业结果连接", "展示连接的传递内容、触发条件、接收者、接通条件和缺口。"),
    ("mobile-architecture.png", "390 × 844", "正常交付", "同一模型重排为纵向路径。"),
    ("mobile-regression-path.png", "390 × 844", "新修复破坏旧功能", "旧功能成为路径中的独立步骤。"),
]


def digest(path: Path) -> tuple[str, int]:
    data = path.read_bytes()
    return hashlib.sha256(data).hexdigest(), len(data)


def main() -> None:
    source_manifest: dict[str, dict[str, str | int]] = {}
    for name in SOURCE_FILES:
        sha, size = digest(ROOT / name)
        source_manifest[name] = {"sha256": sha, "bytes": size}
    (ROOT / "source-manifest.json").write_text(
        json.dumps({"generated_on": "2026-10-26", "files": source_manifest}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    lines = [
        "# 视觉截图清单",
        "",
        "`prototype/verify.py` 从当前 `index.html`、`styles.css`、`architecture-data.js` 和 `app.js` 同次渲染下面的 PNG。浏览器插件在本会话不可用；本地自验使用 Chromium 和 Playwright，远端交付截图由该分支的临时材料化工作流用 Playwright 管理的 Chromium 重新生成。脚本将同一组源文件内联后通过 `page.set_content` 渲染，没有另写一份页面。",
        "",
        "| 文件 | 视口 | 状态 | 用途 | SHA-256 |",
        "| --- | --- | --- | --- | --- |",
    ]
    screenshot_manifest = []
    for name, viewport, state, purpose in SCREENSHOTS:
        path = PREVIEWS / name
        sha, size = digest(path)
        data = path.read_bytes()
        if data[:8] != b"\x89PNG\r\n\x1a\n":
            raise ValueError(f"{name}: not a PNG file")
        width, height = struct.unpack(">II", data[16:24])
        dimensions = f"{width} × {height}"
        if dimensions != viewport:
            raise ValueError(f"{name}: expected {viewport}, got {dimensions}")
        lines.append(f"| `{name}` | {viewport} | {state} | {purpose} | `{sha}` |")
        screenshot_manifest.append(
            {
                "file": name,
                "viewport": viewport,
                "state": state,
                "purpose": purpose,
                "sha256": sha,
                "bytes": size,
            }
        )
    lines.extend(
        [
            "",
            "截图只证明展示网站的布局与交互状态，不证明 Delivery Assurance 已经实施，也不证明 Lucerna 当前生产版本已经通过新的独立验收。",
        ]
    )
    (PREVIEWS / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    (PREVIEWS / "manifest.json").write_text(
        json.dumps(
            {
                "generated_on": "2026-10-26",
                "source_manifest": "../prototype/source-manifest.json",
                "screenshots": screenshot_manifest,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
