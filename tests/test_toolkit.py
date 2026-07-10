import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest


REPO = Path(__file__).resolve().parents[1]
TOOLKIT = REPO / "scripts" / "toolkit.py"
PY = REPO / ".local" / "envs" / "toolkit" / "bin" / "python"
if not PY.exists():
    PY = Path(sys.executable)


def run(cmd, cwd=None, env=None, check=False):
    return subprocess.run(
        cmd,
        cwd=cwd,
        env=env,
        check=check,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )


def git(cmd, cwd, check=True):
    return run(["git", *cmd], cwd=cwd, check=check)


def make_bare_repo(base: Path) -> tuple[Path, Path, str]:
    work = base / "work"
    bare = base / "origin.git"
    work.mkdir()
    git(["init", "-b", "main"], work)
    (work / "README.md").write_text("one\n", encoding="utf-8")
    git(["add", "README.md"], work)
    git(["-c", "user.name=Test", "-c", "user.email=test@example.com", "commit", "-m", "initial"], work)
    first = git(["rev-parse", "HEAD"], work).stdout.strip()
    git(["clone", "--bare", str(work), str(bare)], base)
    git(["remote", "add", "origin", str(bare)], work)
    git(["push", "-u", "origin", "main"], work)
    return work, bare, first


def inventory(repo_url: str, extra: str = "", commands: str = "      - echo ok\n") -> str:
    return f"""resources:
  - id: demo
    name: Demo
    kind: software
    resource_role: software
    category: software/demo
    repo_url: {repo_url}
    local_path: software/demo
    upstream_path: software/demo/repo
    priority: core
    lifecycle: active
    support_status: verified
    integration_status: standalone
    default_ref: main
    last_verified_commit: null
    primary_commands:
{commands}    outputs:
      - TXT
    license: unknown
    requires_api_key: false
    headless_linux: good
    superseded_by: null
    provenance_note: test
    derived_from: []
    notes: test
{extra}"""


class ToolkitTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name) / "toolkit"
        self.root.mkdir()
        (self.root / "inventory").mkdir()
        (self.root / "software" / "demo").mkdir(parents=True)
        (self.root / "software" / "demo" / "README.md").write_text("# Demo\n", encoding="utf-8")
        (self.root / "inventory" / "candidates.yaml").write_text("candidates: []\n", encoding="utf-8")
        (self.root / "inventory" / "retired.yaml").write_text("retired_resources: []\n", encoding="utf-8")

    def tearDown(self):
        self.tmp.cleanup()

    def cli(self, *args, env=None):
        run_env = os.environ.copy()
        run_env["TOOLKIT_ROOT"] = str(self.root)
        if env:
            run_env.update(env)
        return run([str(PY), str(TOOLKIT), *args], env=run_env)

    def write_inventory(self, text):
        (self.root / "inventory" / "resources.yaml").write_text(text, encoding="utf-8")

    def test_validate_fresh_without_repo(self):
        self.write_inventory(inventory("https://example.com/demo.git"))
        cp = self.cli("validate")
        self.assertEqual(cp.returncode, 0, cp.stdout + cp.stderr)

    def test_duplicate_id_and_path_are_rejected(self):
        self.write_inventory(inventory("https://example.com/demo.git", extra=inventory("https://example.com/other.git").split("resources:\n", 1)[1]))
        cp = self.cli("validate")
        self.assertNotEqual(cp.returncode, 0)
        self.assertIn("duplicate id", cp.stdout)
        self.assertIn("duplicate local_path", cp.stdout)

    def test_no_url_formal_resource_rejected(self):
        self.write_inventory(inventory("not specified"))
        cp = self.cli("validate")
        self.assertNotEqual(cp.returncode, 0)
        self.assertIn("repo_url", cp.stdout)

    def test_sync_dry_run_and_first_clone(self):
        _, bare, _ = make_bare_repo(Path(self.tmp.name))
        self.write_inventory(inventory(str(bare)))
        dry = self.cli("sync", "--id", "demo", "--dry-run")
        self.assertEqual(dry.returncode, 0)
        self.assertIn("DRY_RUN", dry.stdout)
        clone = self.cli("sync", "--id", "demo")
        self.assertEqual(clone.returncode, 0, clone.stdout + clone.stderr)
        self.assertTrue((self.root / "software" / "demo" / "repo" / ".git").is_dir())

    def test_sync_rejects_remote_mismatch_and_dirty_repo(self):
        _, bare, _ = make_bare_repo(Path(self.tmp.name))
        other = Path(self.tmp.name) / "other.git"
        git(["clone", "--bare", str(bare), str(other)], Path(self.tmp.name))
        self.write_inventory(inventory(str(bare)))
        repo = self.root / "software" / "demo" / "repo"
        git(["clone", str(other), str(repo)], self.root)
        mismatch = self.cli("sync", "--id", "demo")
        self.assertNotEqual(mismatch.returncode, 0)
        self.assertIn("remote mismatch", mismatch.stdout)
        git(["remote", "set-url", "origin", str(bare)], repo)
        (repo / "dirty.txt").write_text("dirty\n", encoding="utf-8")
        dirty = self.cli("sync", "--id", "demo")
        self.assertEqual(dirty.returncode, 0)
        self.assertIn("dirty repo skipped", dirty.stdout)

    def test_sync_fast_forward_and_status_dirty(self):
        work, bare, first = make_bare_repo(Path(self.tmp.name))
        self.write_inventory(inventory(str(bare)))
        self.assertEqual(self.cli("sync", "--id", "demo").returncode, 0)
        (work / "README.md").write_text("two\n", encoding="utf-8")
        git(["add", "README.md"], work)
        git(["-c", "user.name=Test", "-c", "user.email=test@example.com", "commit", "-m", "second"], work)
        git(["push"], work)
        sync = self.cli("sync", "--id", "demo")
        self.assertEqual(sync.returncode, 0, sync.stdout + sync.stderr)
        self.assertIn(first, sync.stdout)
        status = self.cli("status", "--id", "demo")
        self.assertEqual(status.returncode, 0)
        self.assertIn("clean", status.stdout)

    def test_doctor_and_smoke_strict_failures(self):
        self.write_inventory(inventory("https://example.com/demo.git", commands="      - definitely_missing_tool --version\n"))
        doctor = self.cli("doctor", "--strict", "--all")
        self.assertNotEqual(doctor.returncode, 0)
        self.assertIn("MISSING", doctor.stdout)
        (self.root / "examples" / "smoke" / "d2").mkdir(parents=True)
        (self.root / "examples" / "smoke" / "d2" / "smoke_architecture.d2").write_text("a -> b\n", encoding="utf-8")
        smoke = self.cli("smoke", "--tool", "d2", "--strict", env={"PATH": "/nonexistent"})
        self.assertNotEqual(smoke.returncode, 0)

    def test_generate_excludes_candidates(self):
        self.write_inventory(inventory("https://example.com/demo.git"))
        (self.root / "inventory" / "candidates.yaml").write_text("candidates:\n  - name: CandidateOnly\n", encoding="utf-8")
        gen = self.cli("generate")
        self.assertEqual(gen.returncode, 0, gen.stdout + gen.stderr)
        index = (self.root / "RESOURCE_INDEX.md").read_text(encoding="utf-8")
        self.assertIn("Generated from inventory/resources.yaml", index)
        self.assertNotIn("CandidateOnly", index)


if __name__ == "__main__":
    unittest.main()
