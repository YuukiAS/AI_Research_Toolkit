#!/usr/bin/env python3
from __future__ import annotations

import contextlib
import http.server
import json
import socket
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent

def bundled_html() -> str:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "styles.css").read_text(encoding="utf-8")
    model = (ROOT / "model.js").read_text(encoding="utf-8")
    app = (ROOT / "app.js").read_text(encoding="utf-8")
    html = html.replace('<link rel="stylesheet" href="styles.css" />', f'<style>{css}</style>')
    html = html.replace('<script src="model.js"></script>', f'<script>{model}</script>')
    html = html.replace('<script src="app.js"></script>', f'<script>{app}</script>')
    return html


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt: str, *args: object) -> None:
        return


def free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return int(s.getsockname()[1])


@contextlib.contextmanager
def local_server():
    port = free_port()
    handler = lambda *args, **kwargs: QuietHandler(*args, directory=str(ROOT), **kwargs)
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{port}/index.html"
    finally:
        server.shutdown()
        thread.join(timeout=3)


def run() -> dict:
    result: dict[str, object] = {"checks": [], "console_errors": [], "page_errors": []}
    html = bundled_html()
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, executable_path="/usr/bin/chromium", args=["--no-sandbox"])
        page = browser.new_page(viewport={"width": 1600, "height": 1000}, device_scale_factor=1)
        page.set_default_timeout(6000)
        page.on("console", lambda msg: result["console_errors"].append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda exc: result["page_errors"].append(str(exc)))
        page.set_content(html, wait_until="load")

        # Default Mica: system -> mechanism.
        assert page.locator("#projectName").inner_text() == "Mica"
        assert page.locator("#nodeLayer .graph-node").count() >= 4
        assert "有限恢复状态机" in page.locator("#inspectorBody").inner_text()
        result["checks"].append("Mica topology and mechanism drill-down")
        print("ok: mica mechanism", flush=True)
        page.screenshot(path=str(ROOT / "preview.png"), full_page=True)

        # Mechanism -> actual implementation anchors.
        page.get_by_role("button", name="实现", exact=True).click()
        body = page.locator("#inspectorBody").inner_text()
        assert "stale-composer-recovery.ts" in body and "attemptRecovery" in body and "verifyRecovery" in body
        result["checks"].append("Mica real file/function/test anchors")
        print("ok: mica implementation", flush=True)

        # Relation payload/consumer.
        page.locator('[data-relation="mica-rel-dom-stale"]').evaluate("el => el.dispatchEvent(new MouseEvent('click', {bubbles:true}))")
        relation_text = page.locator("#inspectorBody").inner_text()
        assert "完整清空、重挂载、文本指纹" in relation_text
        assert "ChatGPT DOM" in relation_text and "Stale composer 恢复" in relation_text
        result["checks"].append("Relation payload and consumer")
        print("ok: relation", flush=True)

        # CAT-TRACE semantic diff and causal evolution.
        page.get_by_role("button", name="CAT-TRACE", exact=True).click()
        page.locator('[data-test="compare-button"]').click()
        assert page.locator("#diffBanner").is_visible()
        page.locator('[data-component="cat-zero"]').first.evaluate("el => el.dispatchEvent(new MouseEvent('click', {bubbles:true}))")
        page.get_by_role("button", name="演进", exact=True).click()
        diff_text = page.locator("#inspectorBody").inner_text()
        assert "撤销普通 zero-column local Laplace" in diff_text
        assert "确定性反例" in diff_text
        result["checks"].append("CAT-TRACE causal architecture diff")
        print("ok: cat diff", flush=True)
        page.screenshot(path=str(ROOT / "preview-diff.png"), full_page=True)

        # Completeness checks.
        page.locator('[data-test="checks-button"]').click()
        assert page.locator("#checksDialog").is_visible()
        checks_text = page.locator("#checksDialog").inner_text()
        assert "GAP-01" in checks_text and "完整性检查" in checks_text
        result["checks"].append("Completeness and boundary checks")
        print("ok: checks", flush=True)
        page.screenshot(path=str(ROOT / "preview-checks.png"), full_page=True)
        page.locator("#closeChecks").click()

        # Design-only project must not invent implementation.
        page.get_by_role("button", name="Delivery Assurance", exact=True).click()
        page.locator('[data-component="da-slice"]').first.evaluate("el => el.dispatchEvent(new MouseEvent('click', {bubbles:true}))")
        page.get_by_role("button", name="实现", exact=True).click()
        da_text = page.locator("#inspectorBody").inner_text()
        assert "没有生产实现锚点" in da_text and "不会虚构" in da_text
        result["checks"].append("Design exists without fabricated implementation")
        print("ok: design only", flush=True)

        # Mobile bottom sheet.
        mobile = browser.new_page(viewport={"width": 460, "height": 1000}, device_scale_factor=1)
        mobile.set_default_timeout(6000)
        mobile.on("console", lambda msg: result["console_errors"].append(msg.text) if msg.type == "error" else None)
        mobile.on("pageerror", lambda exc: result["page_errors"].append(str(exc)))
        mobile.set_content(html, wait_until="load")
        mobile.locator('[data-component="mica-stale"]').last.evaluate("el => el.dispatchEvent(new MouseEvent('click', {bubbles:true}))")
        assert mobile.locator("#inspector").evaluate("el => el.classList.contains('open')")
        assert "有限恢复状态机" in mobile.locator("#inspectorBody").inner_text()
        mobile.screenshot(path=str(ROOT / "preview-mobile.png"), full_page=True)
        result["checks"].append("Mobile component bottom sheet")
        print("ok: mobile", flush=True)
        mobile.close()

        browser.close()

    assert not result["console_errors"], result["console_errors"]
    assert not result["page_errors"], result["page_errors"]
    return result


if __name__ == "__main__":
    output = run()
    print(json.dumps(output, ensure_ascii=False, indent=2))
