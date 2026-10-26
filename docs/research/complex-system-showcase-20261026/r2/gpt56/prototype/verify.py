from __future__ import annotations

import asyncio
import json
import os
from pathlib import Path

from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent
PREVIEWS = ROOT.parent / "previews"


def bundled_html() -> str:
    """Bundle the static prototype for a policy-constrained local browser run."""
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "styles.css").read_text(encoding="utf-8")
    data = (ROOT / "architecture-data.js").read_text(encoding="utf-8")
    app = (ROOT / "app.js").read_text(encoding="utf-8")
    html = html.replace('<link rel="stylesheet" href="styles.css">', f'<style>{css}</style>')
    html = html.replace('<script src="architecture-data.js" defer></script>', "")
    html = html.replace('<script src="app.js" defer></script>', "")
    return html.replace("</body>", f"<script>{data}</script><script>{app}</script></body>")


BUNDLED_HTML = bundled_html()


async def collect_page_checks(page, label: str) -> dict:
    errors: list[str] = []
    warnings: list[str] = []
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else warnings.append(msg.text) if msg.type == "warning" else None)
    page.on("pageerror", lambda exc: errors.append(str(exc)))
    await page.set_content(BUNDLED_HTML, wait_until="domcontentloaded", timeout=15000)
    await page.wait_for_selector("[data-node-id='da']", state="attached", timeout=5000)
    metrics = await page.evaluate(
        """
        () => ({
          title: document.title,
          width: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          height: document.documentElement.clientHeight,
          meaningfulText: document.body.innerText.includes('Delivery Assurance') && document.body.innerText.includes('项目验收程序'),
          diagramVisible: getComputedStyle(document.querySelector('.diagram-stage')).display !== 'none',
          mobileGraphVisible: getComputedStyle(document.querySelector('.mobile-graph')).display !== 'none',
          nodeCount: document.querySelectorAll('.diagram-node').length,
          edgeCount: document.querySelectorAll('.edge-group').length,
          dimmedCount: document.querySelectorAll('.diagram-node.dimmed, .edge-group.dimmed').length,
          nodeOverlapPairs: (() => {
            const nodes = [...document.querySelectorAll('.diagram-node')].map((el) => ({
              id: el.dataset.nodeId,
              rect: el.getBoundingClientRect()
            }));
            const pairs = [];
            for (let i = 0; i < nodes.length; i += 1) {
              for (let j = i + 1; j < nodes.length; j += 1) {
                const a = nodes[i].rect;
                const b = nodes[j].rect;
                const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);
                const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
                if (overlapX > 1 && overlapY > 1) pairs.push([nodes[i].id, nodes[j].id]);
              }
            }
            return pairs;
          })(),
          h1: document.querySelector('h1')?.innerText || ''
        })
        """
    )
    return {
        "label": label,
        "metrics": metrics,
        "console_errors": errors,
        "console_warnings": warnings,
        "horizontal_overflow": metrics["scrollWidth"] > metrics["width"] + 1,
    }


async def main() -> None:
    PREVIEWS.mkdir(parents=True, exist_ok=True)
    results: dict[str, object] = {}
    async with async_playwright() as p:
        launch_args = {
            "headless": True,
            "args": ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
        }
        configured = os.environ.get("CHROMIUM_EXECUTABLE")
        local_chromium = Path("/usr/bin/chromium")
        if configured:
            launch_args["executable_path"] = configured
        elif local_chromium.exists():
            launch_args["executable_path"] = str(local_chromium)
        browser = await p.chromium.launch(**launch_args)

        desktop = await browser.new_page(viewport={"width": 1600, "height": 1000}, device_scale_factor=1)
        results["desktop_initial"] = await collect_page_checks(desktop, "desktop_initial")
        await desktop.screenshot(path=str(PREVIEWS / "desktop-architecture.png"), full_page=False)

        await desktop.click("[data-node-id='bridge']", force=True)
        await desktop.wait_for_timeout(150)
        bridge_title = await desktop.locator("#inspector-title").inner_text()
        bridge_related = await desktop.locator(".diagram-node.related").count()
        await desktop.screenshot(path=str(PREVIEWS / "desktop-component-bridge.png"), full_page=False)
        results["component_interaction"] = {
            "selected": bridge_title,
            "related_nodes": bridge_related,
            "pass": bridge_title == "Bridge Kit" and bridge_related > 0,
        }

        await desktop.click("[data-scenario='failure']", force=True)
        await desktop.wait_for_timeout(150)
        failure_title = await desktop.locator("#scenario-title").inner_text()
        failure_edges = await desktop.locator(".edge-group.scenario-active.edge-failure").count()
        failure_dimmed = await desktop.locator(".diagram-node.dimmed, .edge-group.dimmed").count()
        await desktop.screenshot(path=str(PREVIEWS / "desktop-failure-path.png"), full_page=False)
        results["failure_scenario"] = {
            "title": failure_title,
            "failure_edges": failure_edges,
            "dimmed_count": failure_dimmed,
            "pass": failure_title == "验收失败，返回原任务" and failure_edges == 2 and failure_dimmed == 0,
        }

        await desktop.locator("[data-edge-id='validators-da'] .edge-hit").focus()
        await desktop.keyboard.press("Enter")
        edge_title = await desktop.locator("#inspector-title").inner_text()
        await desktop.screenshot(path=str(PREVIEWS / "desktop-connection-detail.png"), full_page=False)
        results["keyboard_edge"] = {"selected": edge_title, "pass": edge_title == "专业结果"}

        mobile = await browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=1)
        results["mobile_initial"] = await collect_page_checks(mobile, "mobile_initial")
        await mobile.screenshot(path=str(PREVIEWS / "mobile-architecture.png"), full_page=False)
        await mobile.click("[data-scenario='regression']", force=True)
        await mobile.wait_for_timeout(150)
        mobile_steps = await mobile.locator(".mobile-path-list li").count()
        mobile_title = await mobile.locator("#scenario-title").inner_text()
        await mobile.screenshot(path=str(PREVIEWS / "mobile-regression-path.png"), full_page=False)
        results["mobile_regression"] = {
            "title": mobile_title,
            "steps": mobile_steps,
            "pass": mobile_title == "新修复破坏旧功能" and mobile_steps == 6,
        }

        await browser.close()

    required_passes = [
        not results["desktop_initial"]["horizontal_overflow"],
        results["desktop_initial"]["metrics"]["meaningfulText"],
        results["desktop_initial"]["metrics"]["diagramVisible"],
        results["desktop_initial"]["metrics"]["nodeCount"] == 13,
        results["desktop_initial"]["metrics"]["edgeCount"] == 18,
        results["desktop_initial"]["metrics"]["dimmedCount"] == 0,
        not results["desktop_initial"]["metrics"]["nodeOverlapPairs"],
        results["component_interaction"]["pass"],
        results["failure_scenario"]["pass"],
        results["keyboard_edge"]["pass"],
        not results["mobile_initial"]["horizontal_overflow"],
        results["mobile_initial"]["metrics"]["mobileGraphVisible"],
        results["mobile_regression"]["pass"],
        not results["desktop_initial"]["console_errors"],
        not results["mobile_initial"]["console_errors"],
    ]
    results["overall_pass"] = all(required_passes)
    (ROOT / "qa-results.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(results, ensure_ascii=False, indent=2))
    if not results["overall_pass"]:
        raise SystemExit(1)


if __name__ == "__main__":
    asyncio.run(main())
