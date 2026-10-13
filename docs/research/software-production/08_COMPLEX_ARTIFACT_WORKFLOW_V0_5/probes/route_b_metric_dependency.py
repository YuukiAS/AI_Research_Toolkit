"""Research-only pure-function counterexample; no model training or medical data.

casewise_rows is transcribed verbatim from the GitHub contents result for lines
112-140 of the fixed historical source. This executes that function, not the
complete CARE runner, and is not a deployed workflow or acceptance evaluator.
"""
from __future__ import annotations
import hashlib
import inspect
import json
from pathlib import Path
from typing import Any

SOURCE_COMMIT = "75a40e454de43b64e59a0b0b438ff57ef2bb8345"
SOURCE_BLOB = "81b1c7e2708f3c8a3ba92ea79dae629936b73f2d"
SOURCE_PATH = "scripts/training/route_B_round04/myops/B6/run_B6_joint.py"


def casewise_rows(cases: list[dict[str, Any]]) -> list[dict[str, Any]]:
    rows = []
    for idx, case in enumerate(cases):
        scar_positive = bool(case.get("scar_positive"))
        t2_present = bool(case.get("t2_present"))
        t2_edema_positive = bool(case.get("t2_edema_positive"))
        baseline_scar = 0.42 + 0.01 * (idx % 5)
        final_scar = baseline_scar + (0.015 if scar_positive else 0.0)
        baseline_edema = 0.30 + 0.01 * (idx % 4)
        final_edema = baseline_edema + (0.018 if t2_edema_positive else 0.0)
        rows.append(
            {
                "case_id": case.get("case_id"),
                "center": case.get("center"),
                "scar_positive": scar_positive,
                "t2_present": t2_present,
                "t2_edema_positive": t2_edema_positive,
                "no_t2": not t2_present,
                "baseline_scar_dice_local": round(baseline_scar, 5),
                "final_scar_dice_local": round(final_scar, 5),
                "baseline_edema_dice_local": round(baseline_edema, 5),
                "final_edema_dice_local": round(final_edema, 5),
                "helped_not_empty": scar_positive or t2_edema_positive,
                "empty_gt_counted_as_help": False,
                "metric_scope": "local_same_split_proxy_not_hosted",
                "proxy_metric_as_hosted": False,
            }
        )
    return rows


def independent_dice(prediction: list[int], truth: list[int]) -> float:
    if len(prediction) != len(truth):
        raise ValueError("Prediction and truth length differ")
    denominator = sum(prediction) + sum(truth)
    if denominator == 0:
        raise ValueError("Empty/empty case outside this probe")
    return 2.0 * sum(p and t for p, t in zip(prediction, truth)) / denominator


def run() -> dict[str, Any]:
    descriptor = {"case_id": "RESEARCH_SYNTHETIC_A", "center": "TEST",
                  "scar_positive": True, "t2_present": True,
                  "t2_edema_positive": True}
    truth = [0, 1, 1, 0]
    # Added keys are intentionally irrelevant to the historical API: it never
    # accepted/consumed prediction tensors. No claim of full-pipeline execution.
    perfect = dict(descriptor, prediction=truth, truth=truth)
    empty = dict(descriptor, prediction=[0, 0, 0, 0], truth=truth)
    historic_perfect = casewise_rows([perfect])[0]
    historic_empty = casewise_rows([empty])[0]
    other = dict(descriptor, case_id="RESEARCH_SYNTHETIC_B")
    reordered_a = casewise_rows([other, descriptor])[1]
    assert historic_perfect == historic_empty
    assert independent_dice(perfect["prediction"], truth) == 1.0
    assert independent_dice(empty["prediction"], truth) == 0.0
    assert reordered_a["final_scar_dice_local"] != historic_perfect["final_scar_dice_local"]
    assert historic_perfect["metric_scope"] == "local_same_split_proxy_not_hosted"
    return {
        "status": "HISTORICAL_PURE_FUNCTION_COUNTEREXAMPLE_REPRODUCED",
        "source": {"repository": "YuukiAS/CARE_Challenge", "commit": SOURCE_COMMIT,
                   "blob": SOURCE_BLOB, "path": SOURCE_PATH, "lines": [112, 140],
                   "transcribed_function_sha256": hashlib.sha256(inspect.getsource(casewise_rows).encode()).hexdigest()},
        "observations": {
            "historical_perfect_and_empty_outputs_identical": True,
            "historical_final_scar_score": historic_perfect["final_scar_dice_local"],
            "independent_perfect_dice": 1.0,
            "independent_empty_dice": 0.0,
            "same_case_after_reordering_scar_score": reordered_a["final_scar_dice_local"],
            "historical_explicit_proxy_label_preserved": historic_perfect["metric_scope"]},
        "limits": ["Only the transcribed pure function was executed",
                   "No complete CARE model, runner, medical data, GPU or Slurm execution",
                   "Proxy label is explicit; not a finding of hosted-score misrepresentation",
                   "This does not establish that the proposed new workflow already detects such faults"],
        "effects": {"network": False, "production_files_changed": False,
                    "paid_model_calls": 0, "training_steps": 0}}

if __name__ == "__main__":
    output = json.dumps(run(), ensure_ascii=False, indent=2) + "\n"
    Path(__file__).with_suffix(".result.json").write_text(output, encoding="utf-8")
    print(output)
