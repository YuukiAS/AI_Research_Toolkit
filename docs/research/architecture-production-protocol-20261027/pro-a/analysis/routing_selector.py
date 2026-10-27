#!/usr/bin/env python3
"""Pure routing demonstration. No model calls, external actions or evidence inference.

The responsible architect must establish the semantic input from real evidence.
This is research reference code, not an installed production approval gate.
"""
import json
import sys
from pathlib import Path

RULES = {
    "CORE_CHANGE": (0, "RETURN_TO_ARCHITECT", "Chat / Pro"),
    "CORE_DESIGN": (0, "RETURN_TO_ARCHITECT", "Chat / Pro"),
    "FACT_RUNTIME": (1, "CODEX_MINIMAL_PROBE", "Codex"),
    "FACT_READ": (2, "CODEX_FACT_CHECK", "Codex"),
    "ROUTE_COMPETITION": (3, "SECOND_INDEPENDENT_DESIGN", "Independent Pro"),
    "BLINDSPOT": (4, "WORK_BLINDSPOT_AUDIT", "GPT Work"),
    "IMPLEMENTATION_BUG": (5, "LOCAL_CODEX_FIX", "Codex"),
    "PRODUCT_DECISION": (6, "USER_PRODUCT_DECISION", "User"),
}
GATES = ("capabilities", "mechanisms", "paths", "premises", "findings", "scope_identity")


def decision(action, recipient, reason, parallel=None):
    return {"next_action": action, "recipient": recipient, "reason": reason,
            "parallel": parallel or [], "convergence_owner": "Chat / Pro"}


def select(state):
    """Return one next action; missing/unknown data can never imply Freeze."""
    if state.get("stage") not in {"design", "implementation", "acceptance"}:
        return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Missing or invalid stage")
    if not isinstance(state.get("issues"), list):
        return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Unresolved issues not assessed")
    if state.get("explicit_evidence_deferral") is True:
        if not state.get("authorization_ref") or not state.get("authorized_candidate_scope"):
            return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Locate exact existing deferral and candidate scope; do not ask again")
        return decision("APPLY_EXISTING_USER_DECISION", "Current Chat / Pro",
                        "Apply the recorded candidate-only authorization immediately; retain UNKNOWN evidence and no global Freeze. This exception requires the original instruction, not generic auto-dispatch.")
    issues = state["issues"]
    ids = [i.get("id") for i in issues if isinstance(i, dict)]
    if len(ids) != len(issues) or any(not isinstance(i, str) or not i for i in ids) or len(set(ids)) != len(ids):
        return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Invalid issue identities")
    for item in issues:
        if item.get("kind") not in RULES or not isinstance(item.get("depends_on"), list):
            return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Issue type/dependencies not assessed")
        if any(d not in ids for d in item.get("depends_on", [])):
            return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Unresolved dependency outside input")
        if item["kind"] == "IMPLEMENTATION_BUG" and state.get("scope_frozen") is not True:
            return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Bug routing requires an existing frozen contract")
        if item["kind"] == "PRODUCT_DECISION" and item.get("options_prepared") is not True:
            return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Prepare concrete product options before asking user")
    if issues:
        ready = [i for i in issues if not i.get("depends_on")]
        if not ready:
            return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "No actionable dependency root; resolve dependency cycle")
        ready.sort(key=lambda i: (0 if i.get("high_impact") is True else 1, RULES[i["kind"]][0], i["id"]))
        primary = ready[0]
        _, action, recipient = RULES[primary["kind"]]
        parallel = []
        if primary.get("can_parallel") is True:
            for item in ready[1:]:
                if item.get("can_parallel") is True:
                    _, a, r = RULES[item["kind"]]
                    parallel.append({"issue": item["id"], "next_action": a, "recipient": r})
        return decision(action, recipient, "Resolve " + primary["id"], parallel)
    if state["stage"] == "design":
        gates = state.get("gates", {})
        incomplete = [g for g in GATES if gates.get(g) is not True]
        if incomplete:
            return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Classify unresolved gates: " + ", ".join(incomplete))
        if type(state.get("readiness_required")) is not bool:
            return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Readiness requirement not assessed")
        if state["readiness_required"] and state.get("readiness_passed") is not True:
            return decision("CODEX_READINESS_CHALLENGE", "Independent Codex", "Cold implementer has not passed within scope")
        if state.get("execution_requested") is False:
            return decision("FREEZE_AND_END", "Chat / Pro", "Design-only request complete within scope")
        if state.get("execution_requested") is not True:
            return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Execution intent not established")
        if state.get("execution_authorized") is not True:
            return decision("USER_EXECUTION_AUTHORIZATION", "User", "Concrete handoff ready; new execution authorization outstanding")
        return decision("FREEZE_AND_IMPLEMENT", "Codex", "All supplied gates and necessary cold-read passed")
    if state.get("scope_frozen") is not True:
        return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Implementation needs a valid bounded design")
    if state.get("verification_passed") is not True:
        return decision("CODEX_VERIFY", "Codex", "Current candidate verification incomplete")
    if type(state.get("independent_acceptance_required")) is not bool:
        return decision("RETURN_TO_ARCHITECT", "Chat / Pro", "Independent acceptance requirement not assessed")
    if state["independent_acceptance_required"] and state.get("acceptance_passed") is not True:
        return decision("WORK_FINAL_ACCEPTANCE", "GPT Work", "Independent product evidence still needed")
    return decision("CLOSE_TASK", "Chat / Pro", "Current bounded delivery and required acceptance complete")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python routing_selector.py routing_scenarios.json")
    scenarios = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    results = []
    for row in scenarios:
        got = select(row["input"])
        if got["next_action"] != row["expected_next_action"]:
            raise AssertionError((row["id"], row["expected_next_action"], got))
        results.append({"id": row["id"], "result": got})
    print(json.dumps({"purpose": "ASSUMED_STATE_ROUTING_CHECK_NOT_HISTORICAL_DETECTION", "results": results}, ensure_ascii=False, indent=2))
