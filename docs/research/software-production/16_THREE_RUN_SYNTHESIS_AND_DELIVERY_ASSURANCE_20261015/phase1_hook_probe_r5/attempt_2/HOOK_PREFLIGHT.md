# Delivery Assurance Phase 1 Hook Probe R5 — Attempt 2 Hook Preflight

## Frozen identity

- Date: `2026-10-18` (`America/New_York`)
- Host: Linux / Longleaf
- Package: `58717a6b3ace4f5ccf094fb4f8754231af762d54`
- Critic PASS: `2964e6a14f927e408b9a7a0d8803dcaea8d6e51d`
- Branch: `work/delivery-assurance-hook-probe-r5`
- Worktree: `/tmp/ai-research-toolkit-da-hook-probe-r5`
- Target Codex binary: `/users/a/e/aereinh/bin/codex`
- Target Codex version: `codex-cli 0.160.1`
- Model: `gpt-5.6-sol`
- Authentication: `EXISTING_SESSION_AVAILABLE`
- `CODEX_HOME`: normal existing user identity; not switched
- `CODEX_SQLITE_HOME`: `NOT_OVERRIDDEN_FOR_PROBE`
- Codex internal SQLite/index/log/session/rollout/auth state: `OUT_OF_SCOPE_FOR_DA_ACCEPTANCE`
- `AI_BRIDGE_STATE_HOME`: `/tmp/delivery-assurance-r5-attempt2/bridge-state`
- `--ignore-user-config`: `NOT_USED`
- `--dangerously-bypass-hook-trust`: `NOT_USED`
- re-login / Device Code / API key fallback: `NOT_USED`

## Project trust and Hook source

A no-op worktree `.codex/config.toml` was loaded through normal Codex startup.
`/debug-config` showed the project layer as enabled, proving existing project
trust without adding a project trust entry.

Linked-worktree Hook discovery mapped to the canonical repository project
folder. No prior canonical Hook file existed. The task-owned Hook source was:

`/overflow/htzhu/mingcheng_new/AI_Research_Toolkit/.codex/hooks.json`

Final definition identity:

- Hook definition SHA-256: `d5891d81416f4441e1a0a245bd40236681c144a77c27a35f81f70e4af8d39aab`
- Handler SHA-256: `9a1eadc8b00902d720a82288412323dea1606b318789be40b096eacd1193eb8f`
- Stop command: `/usr/bin/python3 "$(git rev-parse --show-toplevel)/.delivery-assurance-r5-attempt2/handler.py"`
- Stop timeout: `3s`
- Interrupt command: same handler command
- Interrupt timeout: `3s`

On target Codex v0.160.1, normal `/hooks` showed Stop and Interrupt installed and
active after the user's explicit instruction to trust and continue. No other
active matching Stop controller was present. P8 temporarily introduced a
second controlled definition; `/hooks` showed `Installed=2`, `Active=1`, and
`Review=1`, so the untrusted controller was isolated. The original definition
was then restored byte-for-byte.

## Official runtime contract checked

The current official Hook documentation was checked at
`https://developers.openai.com/codex/hooks` (redirecting to ChatGPT Learn). It
documents project-layer trust, exact-definition review, concurrent matching
hooks, Stop continuation, Interrupt non-restart semantics, and project
`hooks.json` discovery. Runtime behavior was checked against those surfaces.

## Cleanup

After evidence capture, the task-owned canonical Hook file, no-op worktree
config, handler workspace, scenario state, and temporary
`AI_BRIDGE_STATE_HOME` were deleted. The `/hooks` UI exposed enable/disable
management but no explicit revoke/remove-trust operation was used. The residual
trust locator is therefore recorded, not edited directly:

- former source: `/overflow/htzhu/mingcheng_new/AI_Research_Toolkit/.codex/hooks.json`
- trusted definition SHA-256: `d5891d81416f4441e1a0a245bd40236681c144a77c27a35f81f70e4af8d39aab`
- source file after cleanup: `ABSENT`
- internal trust store/database modification: `NONE`

## Preflight compliance note

Setup itself used only `/debug-config` and `/hooks`; `codex doctor` was not used.
No auth file, Codex SQLite database, session, rollout, or transcript was directly
opened by the attempt-2 setup, handler, or diagnostic commands. A later P2
Executor turn directly read the Codex memory registry despite the prompt's task
boundary. That post-setup execution violation is recorded in the final verdict;
it is not relabeled as a setup blocker.
