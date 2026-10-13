#!/usr/bin/env python3
"""只在临时目录验证已读源码的观察范围；不运行、修改或验收任何产品。"""
from __future__ import annotations
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
from typing import Sequence

SOURCE = {
    "repository": "YuukiAS/Asteria",
    "commit": "193c033659a7612a99442763077217b130e9b756",
    "path": "scripts/validate-architecture-rc19.mjs",
    "blob_sha": "491531c6c21887033909d41e776d654c861a9e7e",
    "url": "https://github.com/YuukiAS/Asteria/blob/193c033659a7612a99442763077217b130e9b756/scripts/validate-architecture-rc19.mjs",
}
# 与上述固定版本中该函数逐字一致；未导入或执行整个 Vite/产品模块。
ROUTE_FUNCTION = r'''function routeGestalt(edges) {
  const ratios = edges.map((edge) => Number(edge.routeRatio || edge.routeScore || 0)).filter(Number.isFinite).sort((a, b) => a - b)
  const p95 = ratios.length ? ratios[Math.min(ratios.length - 1, Math.ceil(ratios.length * 0.95) - 1)] : 0
  return {
    edgeCount: edges.length,
    avoidableEdgeCrossingCount: 0,
    longDetourCount: ratios.filter((ratio) => ratio > 1.45).length,
    nonMonotoneArchEdgeCount: edges.filter((edge) => edge.nonMonotone).length,
    orthogonalMultiBendEdgeCount: edges.filter((edge) => edge.grammar === "rounded-orthogonal" && edge.bendCount > 1).length,
    floatingRelationLabelCount: 0,
    simpleArchEdgeMaxRouteRatio: ratios.length ? Math.max(...ratios) : 0,
    archEdgeP95RouteRatio: p95,
  }
}'''


def run(argv: Sequence[str], *, cwd: Path | None = None, env: dict[str, str] | None = None) -> str:
    completed = subprocess.run(list(argv), cwd=cwd, env=env, text=True,
                               capture_output=True, timeout=15, check=False)
    if completed.returncode:
        raise RuntimeError(f"Command failed ({completed.returncode}): {argv[0]}\n{completed.stderr}")
    return completed.stdout.strip()


def route_probe(node: str) -> dict:
    program = ROUTE_FUNCTION + r'''
const cases = {
  measured_short: [{routeRatio: 1.1, grammar: "curve", nonMonotone: false}],
  measured_long: [{routeRatio: 2.0, grammar: "curve", nonMonotone: false}],
  no_measurement: [{grammar: "curve", nonMonotone: false}],
  nonfinite_measurement: [{routeRatio: "NaN", grammar: "curve", nonMonotone: false}],
  geometric_crossing_witness: [
    {routeRatio: 1.0, start: [0,0], end: [10,10], labelRect: [4,4,2,2]},
    {routeRatio: 1.0, start: [0,10], end: [10,0], labelRect: [4,4,2,2]}
  ]
};
function listedConstraintsHold(g) {
  return g.edgeCount > 0 && g.nonMonotoneArchEdgeCount === 0 &&
    g.orthogonalMultiBendEdgeCount === 0 && g.floatingRelationLabelCount === 0 &&
    g.longDetourCount === 0 && g.simpleArchEdgeMaxRouteRatio <= 1.45 &&
    g.archEdgeP95RouteRatio <= 1.35;
}
const results = Object.fromEntries(Object.entries(cases).map(([name, value]) => {
  const observation = routeGestalt(value);
  return [name, {observation, listedConstraintsHold: listedConstraintsHold(observation)}];
}));
console.log(JSON.stringify(results));
'''
    results = json.loads(run([node, "--input-type=module", "-e", program]))
    # 两条简单直线的独立几何见证；不假称为产品最终 SVG 路径。
    def orient(a: tuple[int, int], b: tuple[int, int], c: tuple[int, int]) -> int:
        return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
    a,b,c,d = (0,0),(10,10),(0,10),(10,0)
    crossing = orient(a,b,c)*orient(a,b,d) < 0 and orient(c,d,a)*orient(c,d,b) < 0
    return {
        "kind": "pure_function_observation_not_product_test",
        "fragment_sha256": hashlib.sha256(ROUTE_FUNCTION.encode()).hexdigest(),
        "cases": results,
        "independent_straight_segment_crossing_witness": crossing,
        "finding": "两个计数是常量；缺失或非有限测量被报告为零。长绕行正对照确实可触发已有条件，故不是全部检测失效。",
        "limits": "见证输入不证明正式应用会产生同样对象；未运行整个 validator、浏览器或产品。"
    }


def git_probe(git: str) -> dict:
    with tempfile.TemporaryDirectory(prefix="software-source-audit-") as temporary:
        root = Path(temporary)
        hooks = root / "empty-hooks"
        hooks.mkdir()
        env = os.environ.copy()
        for key in list(env):
            if key.startswith("GIT_"):
                del env[key]
        env.update({"GIT_CONFIG_NOSYSTEM": "1", "GIT_CONFIG_GLOBAL": os.devnull,
                    "GIT_AUTHOR_NAME": "Local research probe", "GIT_COMMITTER_NAME": "Local research probe",
                    "GIT_AUTHOR_EMAIL": "probe@example.invalid", "GIT_COMMITTER_EMAIL": "probe@example.invalid"})
        def g(*args: str) -> str:
            return run([git, "-c", "commit.gpgsign=false", "-c", f"core.hooksPath={hooks}", *args], cwd=root, env=env)
        g("init", "-q")
        rel = "src/architecture/trace.ts"
        target = root / rel
        target.parent.mkdir(parents=True)
        target.write_text("export const value = 1;\n", encoding="utf-8")
        g("add", "--", rel)
        g("commit", "-qm", "temporary baseline")
        base = g("rev-parse", "HEAD")
        target.write_text("export const value = 2;\n", encoding="utf-8")
        unstaged = g("diff", "--name-only", "--", rel).splitlines()
        g("add", "--", rel)
        staged = g("diff", "--name-only", "--", rel).splitlines()
        staged_explicit = g("diff", "--cached", "--name-only", "--", rel).splitlines()
        g("commit", "-qm", "temporary candidate")
        committed = g("diff", "--name-only", "--", rel).splitlines()
        baseline_comparison = g("diff", "--name-only", base, "HEAD", "--", rel).splitlines()
        return {"kind": "fresh_temporary_git_repository",
                "original_argv_shape": ["git", "diff", "--name-only", "--", "<protected-path>"],
                "original_command_unstaged": unstaged,
                "original_command_staged": staged,
                "explicit_cached_comparison": staged_explicit,
                "original_command_committed": committed,
                "explicit_baseline_candidate_comparison": baseline_comparison,
                "finding": "原命令能看未暂存修改，但看不到暂存和已提交变更；基线到候选比较能看到已提交修改。",
                "limits": "仅复现 Git 参数语义；未改任何真实仓库，未运行 Asteria 全套科学内容检查。"}


def main() -> None:
    node, git = shutil.which("node"), shutil.which("git")
    if not node or not git:
        raise SystemExit("需要本机已有 node 与 git；本脚本不会安装依赖。")
    result = {"schema": "read-only-source-observation-v1", "source": SOURCE,
              "node_version": run([node, "--version"]), "git_version": run([git, "--version"]),
              "route": route_probe(node), "git": git_probe(git),
              "product_code_changed": False, "real_gui_or_service_tested": False,
              "production_system_implemented_or_validated": False}
    print(json.dumps(result, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
