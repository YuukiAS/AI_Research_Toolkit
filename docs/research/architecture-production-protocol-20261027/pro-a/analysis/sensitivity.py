#!/usr/bin/env python3
"""Pure, standard-library sensitivity examples; no empirical probabilities.

Run from any directory:
  python sensitivity.py --output sensitivity_results.json

All numerical parameters are ASSUMED. Real p, q, L, R, c, shared-blindness s,
and task durations remain UNKNOWN. Grid membership/frequency is not a sampling
distribution and must not be interpreted as a probability of benefit.
"""

import argparse
from decimal import Decimal
import hashlib
import json
from pathlib import Path

D = Decimal
P = tuple(map(D, ("0.02", "0.1", "0.5")))
Q = tuple(map(D, ("0.1", "0.4", "0.8")))
K = tuple(map(D, ("0.01", "0.05", "0.2", "0.5")))
S = tuple(map(D, ("0", "0.5", "0.9")))


def exact(value):
    """JSON strings preserve exact Decimal values, including exact zeros."""
    return format(value, "f")


def sign(value):
    return "POSITIVE" if value > 0 else "NEGATIVE" if value < 0 else "ZERO"


def score(p, q, k):
    return p * q - k


def risk_grid():
    rows = []
    for p in P:
        for q in Q:
            for k in K:
                value = score(p, q, k)
                rows.append({
                    "parameter_status": "ASSUMED",
                    "p": exact(p), "q": exact(q), "k": exact(k),
                    "p_times_q": exact(p * q),
                    "normalized_net_value": exact(value),
                    "sign": sign(value),
                })

    # Exact break-even, including thresholds outside the chosen k grid.
    assert all(score(p, q, p * q) == 0 for p in P for q in Q)
    assert all(sign(score(p, q, k)) == sign(p * q - k)
               for p in P for q in Q for k in K)
    # Monotonicity is an algebraic property of this assumed model, not data.
    assert all(score(b, q, k) >= score(a, q, k)
               for a, b in zip(P, P[1:]) for q in Q for k in K)
    assert all(score(p, b, k) >= score(p, a, k)
               for a, b in zip(Q, Q[1:]) for p in P for k in K)
    assert all(score(p, q, b) <= score(p, q, a)
               for a, b in zip(K, K[1:]) for p in P for q in Q)
    assert len(rows) == 36
    assert {r["sign"] for r in rows} == {"NEGATIVE", "ZERO", "POSITIVE"}
    return {
        "parameter_status": "ASSUMED",
        "real_parameter_status": {x: "UNKNOWN" for x in ("p", "q", "L", "R", "c")},
        "assumed_model": "Delta = p*q*(L-R)-c; k=c/(L-R); Delta/(L-R)=p*q-k",
        "conditions": [
            "L > R; c and L-R use the same cost unit",
            "p is probability of the relevant flaw, q is conditional actionable detection given that flaw",
            "L-R is the loss reduction if detection leads to correction",
            "No empirical estimate or independence across reviewers is asserted",
        ],
        "grid_is_not_a_probability_distribution": True,
        "grid": rows,
        "exact_break_even_rows": [r for r in rows if r["sign"] == "ZERO"],
        "checks": {
            "exact_break_even": True,
            "nondecreasing_in_p": True,
            "nondecreasing_in_q": True,
            "nonincreasing_in_k": True,
            "both_signs_exist_no_universal_preference": True,
        },
    }


def miss_ratio(s, q, n):
    return s + (1 - s) * (1 - q) ** n


def common_blindness():
    q = D("0.6")
    rows = []
    for s in S:
        previous = D(1)
        previous_reduction = None
        for n in (1, 2, 3):
            current = miss_ratio(s, q, n)
            reduction = previous - current
            assert s <= current <= previous <= 1
            assert reduction == (1 - s) * q * (1 - q) ** (n - 1)
            if previous_reduction is not None:
                assert reduction <= previous_reduction
            rows.append({
                "parameter_status": "ASSUMED",
                "s": exact(s), "q": exact(q), "N": n,
                "m_N_over_p": exact(current),
                "m_previous_over_p": exact(previous),
                "marginal_miss_reduction_over_p": exact(reduction),
                "residual_floor_over_p": exact(s),
            })
            previous, previous_reduction = current, reduction
    assert all(miss_ratio(a, q, n) <= miss_ratio(b, q, n)
               for a, b in zip(S, S[1:]) for n in (1, 2, 3))
    return {
        "parameter_status": "ASSUMED",
        "real_parameter_status": {x: "UNKNOWN" for x in ("p", "q", "s")},
        "formula": "m_N/p = s + (1-s)*(1-q)^N",
        "meaning_of_s": "Assumed fraction of flaws undetectable by every reviewer in this mixture model; NOT Pearson correlation",
        "assumptions": [
            "s of the flaws are shared blind spots that all N reviewers miss",
            "Only in the remaining 1-s class, each reviewer independently detects with probability q",
            "Reported marginal reductions are divided by unknown p, not absolute empirical risk reductions",
            "This mixture model is illustrative and not inferred from historical cases",
        ],
        "rows": rows,
        "checks": {
            "miss_ratio_nondecreasing_in_s": True,
            "miss_ratio_nonincreasing_in_N": True,
            "marginal_reduction_nonincreasing_in_N": True,
            "marginal_identity_exact": True,
        },
    }


def schedule(tasks, serial):
    times = {}
    last_finish = 0
    for task in tasks:
        dependency_finish = max((times[x]["finish"] for x in task["depends_on"]), default=0)
        start = max(dependency_finish, last_finish) if serial else dependency_finish
        finish = start + task["duration"]
        times[task["id"]] = {"start": start, "finish": finish}
        last_finish = finish
    return {"task_times": times, "makespan_minutes": max(x["finish"] for x in times.values())}


def critical_path():
    tasks = [
        {"id": "main_design", "duration": 60, "depends_on": []},
        {"id": "work_audit", "duration": 40, "depends_on": []},
        {"id": "probe", "duration": 30, "depends_on": []},
        {"id": "synthesis", "duration": 30, "depends_on": ["main_design", "work_audit", "probe"]},
        {"id": "cold_handoff", "duration": 20, "depends_on": ["synthesis"]},
    ]
    sequential = schedule(tasks, serial=True)
    parallel = schedule(tasks, serial=False)
    total = sum(t["duration"] for t in tasks)
    assert total == 180
    assert sequential["makespan_minutes"] == total
    assert parallel["makespan_minutes"] == 110
    assert parallel["makespan_minutes"] <= sequential["makespan_minutes"]
    for result in (sequential, parallel):
        for t in tasks:
            timing = result["task_times"][t["id"]]
            assert timing["finish"] - timing["start"] == t["duration"]
            assert all(timing["start"] >= result["task_times"][d]["finish"] for d in t["depends_on"])
    return {
        "parameter_status": "ASSUMED",
        "duration_unit": "synthetic minutes; not observed runtime or human work time",
        "comparison_type": "Same task set, durations, and required dependencies; different scheduling only",
        "task_duration_status": "ASSUMED",
        "dependency_status": "ASSUMED",
        "tasks": tasks,
        "task_count_in_both_schedules": len(tasks),
        "total_task_minutes_in_both_schedules": total,
        "sequential_schedule": sequential,
        "parallel_schedule": parallel,
        "within_example_makespan_difference_minutes": sequential["makespan_minutes"] - parallel["makespan_minutes"],
        "real_workflow_savings": "UNKNOWN",
        "conditions": [
            "The first three tasks can independently use the raw inputs",
            "At least three suitable concurrent execution slots are available",
            "No communication overhead, contention, changed output quality, or rework is modeled",
            "If a probe requires a design decision first, its dependency must be changed and the example recomputed",
        ],
        "excluded_noncomparable_example": {
            "status": "REJECTED_AS_COMPARISON",
            "serial_P60_C40_R30_C20_cold20": 170,
            "parallel_design60_work40_probe30_then_synthesis30_cold20": 110,
            "reason": "The task sets and total task minutes differ; 170 versus 110 does not isolate scheduling or workflow benefit",
        },
        "checks": {
            "same_task_set_and_durations": True,
            "all_dependencies_satisfied": True,
            "parallel_schedule_no_longer_than_sequential": True,
        },
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, help="Write JSON here; otherwise print it")
    args = parser.parse_args()
    result = {
        "schema_version": 1,
        "purpose": "Reproducible assumed-parameter sensitivity and scheduling examples only",
        "empirical_probability_estimates": False,
        "numeric_encoding": "Exact decimal quantities are strings; counts and synthetic durations are integers",
        "script_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        "expected_value_grid": risk_grid(),
        "shared_blindness_model": common_blindness(),
        "general_conditional_formula": {
            "status": "MATHEMATICAL_IDENTITY_WITH_DEFINED_CONDITIONAL_PROBABILITIES",
            "formula": "m_N = p * product_{i=1..N}(1-q_i)",
            "definition": "q_i = P(actionable detection by i | flaw exists, all previous i-1 reviews missed)",
            "derivation": "Chain rule of conditional probability, not reviewer independence",
            "zero_probability_path": "If a previous all-missed event has probability zero, m_N remains zero; later conditionals on that event need not be defined",
            "real_p_and_q_i": "UNKNOWN",
            "limitation": "Tracks a fixed flaw and specified review events; revisions that create new flaws require a larger model",
        },
        "critical_path_example": critical_path(),
        "all_embedded_assertions_passed": True,
    }
    encoded = json.dumps(result, ensure_ascii=False, indent=2) + "\n"
    if args.output:
        args.output.write_text(encoded, encoding="utf-8")
    else:
        print(encoded, end="")


if __name__ == "__main__":
    main()
