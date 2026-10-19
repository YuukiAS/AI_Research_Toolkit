# Delivery Assurance Phase 1 Hook Probe R5 — Attempt 3 Hook Preflight

## Frozen identity

- Date: `2026-10-18` (`America/New_York`)
- Host: Linux / Longleaf
- Package: `58717a6b3ace4f5ccf094fb4f8754231af762d54`
- Critic PASS: `2964e6a14f927e408b9a7a0d8803dcaea8d6e51d`
- Branch: `work/delivery-assurance-hook-probe-r5`
- Worktree: `/tmp/ai-research-toolkit-da-hook-probe-r5`
- Target binary: `/users/a/e/aereinh/bin/codex`
- Target version: `codex-cli 0.160.1`
- Model: `gpt-5.6-sol`
- Authentication: `EXISTING_SESSION_AVAILABLE`
- `CODEX_HOME`: normal existing identity; not switched
- `CODEX_SQLITE_HOME`: `NOT_OVERRIDDEN_FOR_PROBE`
- Codex internal state: `OUT_OF_SCOPE_FOR_DA_ACCEPTANCE`
- `AI_BRIDGE_STATE_HOME`: `/tmp/delivery-assurance-r5-attempt2/bridge-state`
- `--ignore-user-config`: `NOT_USED`
- `--dangerously-bypass-hook-trust`: `NOT_USED`
- `codex doctor`: `NOT_USED`
- re-login / Device Code / API key fallback: `NOT_USED`

The temporary runtime locator retains `attempt2` in its name because the clean
run reused the previously reviewed exact Hook command and definition hash. The
directory was absent after Attempt 2 cleanup and was recreated empty. Attempt 3
repository evidence is isolated under `attempt_3/` and does not overwrite
Attempt 2.

## Project trust and Hook attribution

A no-op worktree `.codex/config.toml` was loaded through normal startup.
`/debug-config` showed the project layer enabled, proving existing project
trust without adding a project trust entry.

Task-owned Hook source:

`/overflow/htzhu/mingcheng_new/AI_Research_Toolkit/.codex/hooks.json`

- Hook definition SHA-256: `d5891d81416f4441e1a0a245bd40236681c144a77c27a35f81f70e4af8d39aab`
- Handler SHA-256: `9a1eadc8b00902d720a82288412323dea1606b318789be40b096eacd1193eb8f`
- Stop command: `/usr/bin/python3 "$(git rev-parse --show-toplevel)/.delivery-assurance-r5-attempt2/handler.py"`
- Stop timeout: `3s`
- Interrupt command: same handler
- Interrupt timeout: `3s`

Normal `/hooks` showed the project Stop and Interrupt handlers trusted and
active. The first setup view also showed user-config PreToolUse/PostToolUse
definitions as untrusted and inactive; they were not Stop controllers and did
not affect candidate writes or event attribution. No other matching Stop
controller was active.

P8 temporarily installed a second controlled Stop definition. `/hooks` showed
`Stop Installed=2, Active=1, Review=1`; the second definition remained
untrusted and did not run. The original definition was restored byte-for-byte.
During recovery the task-owned original Stop checkbox was found disabled after
the P8 UI interaction; it was re-enabled through the normal `/hooks` UI without
changing trust. Final `/hooks` showed `Stop Installed=1, Active=1`, and later
P10/P11/P12/P13 events all carried the original definition identity.

## Official contract and private-state boundary

The current official Hook page at `https://developers.openai.com/codex/hooks`
was checked for project discovery, exact-definition trust, Stop continuation,
Interrupt behavior, concurrent matching hooks, and public event fields.

This attempt used only normal Codex/Hook interfaces, ordinary Git/worktree
facts, task-owned files, and temporary `AI_BRIDGE_STATE_HOME`. No diagnostic,
handler, or Executor command directly read, parsed, enumerated, copied, or
depended on `auth.json`, Codex SQLite, memories, sessions, rollouts, indexes,
credential stores, or transcripts.

## Cleanup

After evidence capture, the task-owned canonical Hook source, no-op worktree
config, task workspace, and temporary DA state were removed. No Codex private
database or trust store was edited. The residual trust locator remains:

- former source: `/overflow/htzhu/mingcheng_new/AI_Research_Toolkit/.codex/hooks.json`
- definition SHA-256: `d5891d81416f4441e1a0a245bd40236681c144a77c27a35f81f70e4af8d39aab`
- internal trust-store modification: `NONE`
