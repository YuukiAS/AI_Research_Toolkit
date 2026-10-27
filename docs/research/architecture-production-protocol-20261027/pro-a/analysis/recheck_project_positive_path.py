#!/usr/bin/env python3
"""Recheck one fixed STAT5060 control-flow defect using explicit TEST_DOUBLE inputs.

Usage:
  python recheck_project_positive_path.py --source /path/to/validate_release_v3.py

Acquire the file from the exact commit in SOURCE_URL. The complete source is not
bundled with this script. Before parsing or execution, its original bytes must
match the Git blob SHA returned by GitHub and recorded in source_manifest.json.
Only the top-level combine_semantic_states function is AST-extracted and run;
the product module and its imports are never executed. No source is rewritten.

The qualified_m=True flag, semantic reply, receipts, digest helper, and D inputs
are explicit test doubles used to reach the combiner's positive branch. They
are NOT a qualified M, a real acceptance run, or evidence of course correctness.
"""

import argparse
import ast
import hashlib
import json
import sys
from pathlib import Path
from types import SimpleNamespace

SOURCE_COMMIT = "f5050863e19ab99b5d2e26e46d8fe321007d901e"
SOURCE_PATH = "scripts/final_project/validate_release_v3.py"
SOURCE_URL = (
    "https://github.com/YuukiAS/STAT5060-TA/blob/"
    + SOURCE_COMMIT + "/" + SOURCE_PATH
)
EXPECTED_GIT_BLOB_SHA1 = "0bf3bc66c79d5615a5f81d9b28af87b9104aabf5"
FUNCTION_NAME = "combine_semantic_states"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, required=True,
                        help="Exact original source bytes from SOURCE_COMMIT")
    args = parser.parse_args()
    try:
        raw = args.source.read_bytes()
    except OSError as error:
        parser.error(str(error))
    blob = hashlib.sha1(b"blob " + str(len(raw)).encode("ascii") + b"\0" + raw).hexdigest()
    if blob != EXPECTED_GIT_BLOB_SHA1:
        parser.error("Source Git blob mismatch; no source was parsed or executed. "
                     f"Expected {EXPECTED_GIT_BLOB_SHA1}, got {blob}.")

    parsed = ast.parse(raw, filename=str(args.source))
    matches = [node for node in parsed.body
               if isinstance(node, ast.FunctionDef) and node.name == FUNCTION_NAME]
    if len(matches) != 1:
        parser.error("Expected exactly one top-level target function")
    namespace = {}
    function_only = ast.Module(body=matches, type_ignores=[])
    exec(compile(function_only, str(args.source), "exec"), namespace)

    observations = {
        "identity": {"evidence_status": "COMPLETE"},
        "question_source": {"structural_errors": []},
        "selection_audit": {"evidence_status": "COMPLETE", "errors": []},
        "student_package": {"errors": []},
        "rubric": {"development_checks": {
            "root_errors": {"errors": []}, "written": {"reviews": []}}},
        "unix_zip_execution": {"evidence_status": "COMPLETE"},
        "package_template": {"errors": []},
        "native": {"verification": {"all_native_executed": True}},
        "source_table": {"errors": []},
    }
    semantic = {
        "qualified_m": True,
        "receipt": {"scope_hash": "test-scope"},
        "receipt_ref": {"kind": "TEST_DOUBLE"},
        "reply": {"rule_results": [
            {"rule_id": rule, "content_verdict": "PASS"}
            for rule in ("P01", "P05", "P09", "P11")
        ]},
    }
    result = namespace[FUNCTION_NAME](
        states={}, semantic=semantic, observations=observations,
        common=SimpleNamespace(digest=lambda value: "test-double-digest"),
        d_receipt={"scope_hash": "test-scope"}, oracle_rows=[],
    )
    reproduced = (
        result["P01"]["content_verdict"] == "PASS"
        and all(result[rule]["content_verdict"] == "NOT_EVALUATED"
                and result[rule]["failure_code"] == "BLOCKED_COVERAGE_INCOMPLETE"
                for rule in ("P05", "P09", "P11"))
    )
    print(json.dumps({
        "label": "Exact-function control-flow recheck with TEST_DOUBLE inputs",
        "source_commit": SOURCE_COMMIT,
        "source_path": SOURCE_PATH,
        "source_url": SOURCE_URL,
        "source_git_blob_sha1": blob,
        "source_sha256": hashlib.sha256(raw).hexdigest(),
        "source_bytes": len(raw),
        "hash_verified": True,
        "python": sys.version,
        "execution_boundary": {
            "function": FUNCTION_NAME,
            "module_imported": False,
            "only_ast_extracted_function_executed": True,
            "input_evidence_type": "TEST_DOUBLE",
            "qualified_m_flag_is_test_double": True,
            "real_model_run": False,
            "product_acceptance": False,
            "course_acceptance": False,
        },
        "observed_implementation_defect_reproduced": reproduced,
        "result": result,
    }, indent=2))
    return 0 if reproduced else 1


if __name__ == "__main__":
    raise SystemExit(main())
