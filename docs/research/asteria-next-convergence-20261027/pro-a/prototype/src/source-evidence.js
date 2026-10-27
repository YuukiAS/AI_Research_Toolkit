export default {
  "anchors": {
    "m-selectors": {
      "id": "m-selectors",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/content.ts",
      "symbol": "TURN_SELECTOR / COMPOSER_SELECTOR",
      "role": "definition",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L25-L39",
      "range": {
        "startLine": 25,
        "endLine": 39
      },
      "fingerprint": "b37db5c725e31853aa3a349e65c565174e536072ba23f35453954ab36ee2c82e",
      "excerpt": "  const TURN_SELECTOR = [\n    \"[data-message-author-role]\",\n    \"[data-testid^='conversation-turn-']\",\n    \"[data-testid*='conversation-turn']\"\n  ].join(\",\");\n  const ROLE_SELECTOR = \"[data-message-author-role='user'], [data-message-author-role='assistant'], [data-message-author-role='tool']\";\n  const COMPOSER_SELECTOR = [\n    \"[data-testid*='composer']\",\n    \"textarea\",\n    \"[contenteditable]\",\n    \"[role='textbox']\",\n    \"form\"\n  ].join(\",\");\n  const SPECIAL_SELECTOR = [\n    \"textarea\",",
      "access": "public",
      "resolution": "resolved"
    },
    "m-turns": {
      "id": "m-turns",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/content.ts",
      "symbol": "collectConversationTurns",
      "role": "definition",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L844-L872",
      "range": {
        "startLine": 844,
        "endLine": 872
      },
      "fingerprint": "b37db5c725e31853aa3a349e65c565174e536072ba23f35453954ab36ee2c82e",
      "excerpt": "  function collectConversationTurns() {\n    const main = document.querySelector(\"main\") || document.body;\n    const raw = Array.from(main.querySelectorAll(TURN_SELECTOR)).filter((node) => node instanceof HTMLElement);\n    const unique = new Set();\n\n    for (const node of raw) {\n      if (!(node instanceof HTMLElement) || node.closest(\"[data-mica-root='true']\")) continue;\n      let turn = null;\n      const roleNode = node.matches(\"[data-message-author-role]\") ? node : node.querySelector(\"[data-message-author-role]\");\n      if (roleNode instanceof HTMLElement) {\n        turn =\n          roleNode.closest(\"[data-testid^='conversation-turn-']\") ||\n          roleNode.closest(\"[data-testid*='conversation-turn']\") ||\n          roleNode.closest(\"article\") ||\n          roleNode;\n      }\n\n      if (!(turn instanceof HTMLElement)) continue;",
      "access": "public",
      "resolution": "resolved"
    },
    "m-schedule": {
      "id": "m-schedule",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/content.ts",
      "symbol": "scheduleScan",
      "role": "calls",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L722-L738",
      "range": {
        "startLine": 722,
        "endLine": 738
      },
      "fingerprint": "b37db5c725e31853aa3a349e65c565174e536072ba23f35453954ab36ee2c82e",
      "excerpt": "\n  function scheduleScan(reason = \"auto\") {\n    if (!settings.enabled || !settings.longThreadOptimization) return;\n    if (runtimeState.nativeSafeMode && reason !== \"settings\" && reason !== \"url\" && reason !== \"manual\") return;\n    if (scheduled) return;\n    scheduled = true;\n    nextFrame(() => {\n      scheduled = false;\n      try {\n        scanAndApply();\n      } catch (error) {\n        clearOptimization();\n        setStatus(STATUS.DEGRADED, `Scan failed: ${error?.message || String(error)}`, []);\n      }\n    });\n  }",
      "access": "public",
      "resolution": "resolved"
    },
    "m-scan": {
      "id": "m-scan",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/content.ts",
      "symbol": "scanAndApply",
      "role": "transformation",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L739-L842",
      "range": {
        "startLine": 739,
        "endLine": 842
      },
      "fingerprint": "b37db5c725e31853aa3a349e65c565174e536072ba23f35453954ab36ee2c82e",
      "excerpt": "  function scanAndApply() {\n    if (!settings.enabled) {\n      clearOptimization();\n      enterNativeSafeMode(\"disabled\");\n      setStatus(STATUS.DISABLED, \"Disabled by user\", []);\n      return;\n    }\n    if (!settings.longThreadOptimization) {\n      clearOptimization();\n      enterNativeSafeMode(\"long-thread optimization disabled\");\n      refreshLongThreadDisabledStatus(\"scan\");\n      return;\n    }\n    recordComposerDiagnosticRuntimeCallback(\"scan\");\n    if (isComposerEditWindowActive()) {\n      globalCounters.composerEditScansSkipped += 1;\n      updateComposerTextLengthOnly();\n      return;",
      "access": "public",
      "resolution": "resolved"
    },
    "m-protect": {
      "id": "m-protect",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/content.ts",
      "symbol": "getProtectedIndexes",
      "role": "constraint",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/content.ts#L984-L1000",
      "range": {
        "startLine": 984,
        "endLine": 1000
      },
      "fingerprint": "b37db5c725e31853aa3a349e65c565174e536072ba23f35453954ab36ee2c82e",
      "excerpt": "  function getProtectedIndexes(turns) {\n    const protectedIndexes = new Set();\n    const recentStart = Math.max(0, turns.length - settings.recentTurnKeepCount);\n    const streaming = hasStreamingControl();\n\n    for (let index = 0; index < turns.length; index += 1) {\n      const turn = turns[index];\n      if (index >= recentStart) protectedIndexes.add(index);\n      if (isNearViewport(turn)) protectedIndexes.add(index);\n      if (turn.contains(document.activeElement)) protectedIndexes.add(index);\n      if (isSpecialTurn(turn)) protectedIndexes.add(index);\n      if (isComposerProtectedElement(turn)) protectedIndexes.add(index);\n      if (streaming && index >= turns.length - Math.max(4, settings.recentTurnKeepCount)) protectedIndexes.add(index);\n    }\n    return protectedIndexes;\n  }",
      "access": "public",
      "resolution": "resolved"
    },
    "m-signal": {
      "id": "m-signal",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/reliability/connector-lifecycle-signal.ts",
      "symbol": "handlePotentialConnectorSignal / latchConnectorLifecycle",
      "role": "transformation",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-lifecycle-signal.ts#L75-L110",
      "range": {
        "startLine": 75,
        "endLine": 110
      },
      "fingerprint": "ff6c70e364bd8b3cae95f3b4f1d9bbd9f15e9ff19ea9be706372263166059655",
      "excerpt": "  function handlePotentialConnectorSignal(event) {\n    if (!enabled || !configured || !isTrustedEvent(event)) return;\n    if (!isPotentialConnectorEvent(event)) return;\n    const signal = detectSignal(event);\n    if (!signal.detected) return;\n    latchConnectorLifecycle(signal.source, signal.root, signal.editable);\n  }\n\n  function latchConnectorLifecycle(source = \"unknown\", root = null, editable = null) {\n    if (!enabled || !configured) return publicLatch();\n    const now = Date.now();\n    const activeRoot = root instanceof HTMLElement ? root : findComposerRoot(findComposerEditable());\n    const activeEditable = editable instanceof HTMLElement ? editable : findComposerEditable();\n    const rect = measureComposerRect(activeRoot || activeEditable) || latch.lastComposerRect;\n    latchId += latch.latched ? 0 : 1;\n    latch = {\n      detected: true,\n      latched: true,",
      "access": "public",
      "resolution": "resolved"
    },
    "m-event": {
      "id": "m-event",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/reliability/connector-lifecycle-signal.ts",
      "symbol": "publicLatch / dispatchLatchEvent",
      "role": "produces",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-lifecycle-signal.ts#L286-L340",
      "range": {
        "startLine": 286,
        "endLine": 340
      },
      "fingerprint": "ff6c70e364bd8b3cae95f3b4f1d9bbd9f15e9ff19ea9be706372263166059655",
      "excerpt": "  function publicLatch() {\n    expireIfNeeded();\n    const now = Date.now();\n    const chooserActiveNow = enabled && now <= (latch.chooserActiveUntil || 0);\n    const selectionWindowActive = enabled && now <= (latch.selectionWindowUntil || 0);\n    return {\n      detected: !!latch.detected,\n      latched: !!latch.latched,\n      connectorLifecycleLatched: !!latch.latched,\n      connectorContextLatched: !!latch.latched,\n      chooserActiveNow,\n      chooserSource: latch.chooserSource || null,\n      selectionWindowActive,\n      selectionSource: latch.selectionSource || null,\n      selectionId: latch.selectionId || 0,\n      mentionQueryActive: enabled && now <= (latch.mentionQueryUntil || 0),\n      source: latch.source || null,\n      latchId: latch.latchId || 0,",
      "access": "public",
      "resolution": "resolved"
    },
    "m-fast": {
      "id": "m-fast",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/reliability/connector-lifecycle-signal.ts",
      "symbol": "isPotentialConnectorEvent / shouldInspectChooserForEvent",
      "role": "constraint",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-lifecycle-signal.ts#L380-L397",
      "range": {
        "startLine": 380,
        "endLine": 397
      },
      "fingerprint": "ff6c70e364bd8b3cae95f3b4f1d9bbd9f15e9ff19ea9be706372263166059655",
      "excerpt": "  function isPotentialConnectorEvent(event) {\n    if (!event) return false;\n    if (event.type === \"beforeinput\" || event.type === \"input\") {\n      const data = typeof event.data === \"string\" ? event.data : \"\";\n      return data === \"@\";\n    }\n    if (event.type === \"keydown\") {\n      return event.key === \"Enter\" || event.key === \"@\" || (event.key === \"2\" && event.shiftKey);\n    }\n    return event.type === \"focusin\" || event.type === \"click\" || event.type === \"pointerdown\";\n  }\n\n  function shouldInspectChooserForEvent(event) {\n    if (!event) return false;\n    if (event.type === \"keydown\") return event.key === \"Enter\";\n    return event.type === \"click\" || event.type === \"pointerdown\" || event.type === \"focusin\";\n  }",
      "access": "public",
      "resolution": "resolved"
    },
    "m-continuity": {
      "id": "m-continuity",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/reliability/connector-continuity.ts",
      "symbol": "handleSharedConnectorLifecycle / beginLifecycle / handleMutations",
      "role": "consumption",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts#L87-L174",
      "range": {
        "startLine": 87,
        "endLine": 174
      },
      "fingerprint": "0b4f28516bb81e400f2dbf619702ce09e519b5cd7ebc4709d05edf46fb5f7ec8",
      "excerpt": "  function handleSharedConnectorLifecycle(event) {\n    if (!enabled || !configured) return;\n    const shared = event?.detail || getSharedConnectorLifecycleState();\n    if (!shared?.connectorContextLatched && !shared?.latched && !shared?.detected) return;\n    beginLifecycle(shared);\n  }\n\n  function beginLifecycle(shared) {\n    const now = Date.now();\n    const generation = shared?.latchId || 0;\n    if (!lifecycle || lifecycle.connectorContextGeneration !== generation) {\n      lifecycle = {\n        startedAt: now,\n        expiresAt: now + WATCH_WINDOW_MS,\n        activationCandidateRecorded: false,\n        source: sanitizeSource(shared?.source || shared?.selectionSource || \"connector-context\"),\n        currentSurface: null,\n        composerRootId: null,",
      "access": "public",
      "resolution": "resolved"
    },
    "m-cache": {
      "id": "m-cache",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/reliability/connector-continuity.ts",
      "symbol": "refreshSnapshot",
      "role": "transformation",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts#L203-L247",
      "range": {
        "startLine": 203,
        "endLine": 247
      },
      "fingerprint": "0b4f28516bb81e400f2dbf619702ce09e519b5cd7ebc4709d05edf46fb5f7ec8",
      "excerpt": "  function refreshSnapshot(source) {\n    if (!lifecycle || !enabled) return;\n    const now = Date.now();\n    if (now > lifecycle.expiresAt) {\n      cleanup(\"expired\");\n      return;\n    }\n    const surface = findNativeComposerSurface();\n    if (!surface) {\n      checkComposerPresence();\n      return;\n    }\n    const signature = connectorPillSignature(surface);\n    if (lifecycle.visualClone && lifecycle.currentSurface === surface && lifecycle.pillSignature === signature) {\n      lastReport = reportFromLifecycle(lifecycle);\n      return;\n    }\n    const rect = measureComposerRect(surface) || lifecycle.lastRect;",
      "access": "public",
      "resolution": "resolved"
    },
    "m-shell": {
      "id": "m-shell",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/reliability/connector-continuity.ts",
      "symbol": "showShell",
      "role": "rendering",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts#L249-L285",
      "range": {
        "startLine": 249,
        "endLine": 285
      },
      "fingerprint": "0b4f28516bb81e400f2dbf619702ce09e519b5cd7ebc4709d05edf46fb5f7ec8",
      "excerpt": "  function showShell(rect) {\n    if (!lifecycle || shellHost || !rect) return;\n    const skipReason = continuitySkipReason();\n    if (skipReason) {\n      lifecycle.skippedReason = skipReason;\n      lastReport = reportFromLifecycle(lifecycle);\n      return;\n    }\n    shellHost = document.createElement(\"div\");\n    shellHost.dataset.micaConnectorContinuityShell = \"true\";\n    shellHost.setAttribute(\"aria-hidden\", \"true\");\n    shellHost.setAttribute(\"inert\", \"\");\n    Object.assign(shellHost.style, {\n      position: \"fixed\",\n      left: `${Math.round(rect.left)}px`,\n      top: `${Math.round(rect.top)}px`,\n      width: `${Math.max(1, Math.round(rect.width))}px`,\n      height: `${Math.max(1, Math.round(rect.height))}px`,",
      "access": "public",
      "resolution": "resolved"
    },
    "m-skip": {
      "id": "m-skip",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/reliability/connector-continuity.ts",
      "symbol": "continuitySkipReason",
      "role": "constraint",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/connector-continuity.ts#L336-L357",
      "range": {
        "startLine": 336,
        "endLine": 357
      },
      "fingerprint": "0b4f28516bb81e400f2dbf619702ce09e519b5cd7ebc4709d05edf46fb5f7ec8",
      "excerpt": "  function continuitySkipReason() {\n    if (!enabled) return \"feature_disabled\";\n    if (!lifecycle?.connectorLifecycleLatched && !getSharedConnectorLifecycleState()?.connectorContextLatched) return \"not_connector_latched\";\n    if (!lifecycle?.lastRect) return \"no_last_rect\";\n    if (!lifecycle?.visualClone) return \"no_visual_clone\";\n    if (!lifecycle?.capturedAt || cacheAgeMs(lifecycle) > SNAPSHOT_FRESHNESS_MS) return \"stale_snapshot\";\n    if (isRealSendGenerationActive()) return \"real_send_active\";\n    if (isStaleClearRecoveryActive()) return \"stale_clear_active\";\n    return null;\n  }\n\n  function isRealSendGenerationActive() {\n    const state = globalThis.MicaSendResidualRecovery?.getState?.();\n    return !!state?.active || !!state?.sendCandidateActive || !!state?.userTurnCommittedLatched;\n  }\n\n  function isStaleClearRecoveryActive() {\n    const state = globalThis.MicaStaleComposerRecovery?.getState?.();",
      "access": "public",
      "resolution": "resolved"
    },
    "m-stale-intent": {
      "id": "m-stale-intent",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/reliability/stale-composer-recovery.ts",
      "symbol": "handleKeyDown / handleBeforeInput / handleNewUserInput",
      "role": "trigger",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/stale-composer-recovery.ts#L109-L165",
      "range": {
        "startLine": 109,
        "endLine": 165
      },
      "fingerprint": "2cbe6c339a4d96077d7c75a27722ee9b23ce333aecc586daa672598efef250c9",
      "excerpt": "  function handleKeyDown(event) {\n    if (!shouldObserveEvent(event)) return;\n    const editable = findComposerEditableFromTarget(event.target);\n    if (!editable) return;\n    if (isSelectAllShortcut(event)) {\n      fullSelectionIntent = {\n        startedAt: Date.now(),\n        editableId: elementId(editable),\n        rootId: elementId(findComposerRoot(editable))\n      };\n      return;\n    }\n    if (isDeleteKey(event)) {\n      beginPendingFullClear(event, keyToInputType(event), keyToIntentType(event));\n    }\n  }\n\n  function handleBeforeInput(event) {",
      "access": "public",
      "resolution": "resolved"
    },
    "m-stale-confirm": {
      "id": "m-stale-confirm",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/reliability/stale-composer-recovery.ts",
      "symbol": "confirmPendingClear",
      "role": "constraint",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/stale-composer-recovery.ts#L224-L252",
      "range": {
        "startLine": 224,
        "endLine": 252
      },
      "fingerprint": "2cbe6c339a4d96077d7c75a27722ee9b23ce333aecc586daa672598efef250c9",
      "excerpt": "  function confirmPendingClear(event, source, inputType) {\n    if (!pendingClear) return false;\n    if (Date.now() > pendingClear.expiresAt) {\n      cancelPendingClear(\"expired\");\n      return false;\n    }\n    const snapshot = readPendingClearSnapshot(pendingClear, event);\n    pendingClear.clearConfirmationChecks += 1;\n    record(\"stale_recovery_clear_confirmation_check\", {\n      generationId: pendingClear.generationId,\n      checkCount: pendingClear.clearConfirmationChecks,\n      source,\n      composerPresent: snapshot.exists,\n      textLength: snapshot.textLength,\n      targetMatched: snapshot.targetMatched,\n      editableId: snapshot.editableId,\n      rootId: snapshot.rootId\n    });",
      "access": "public",
      "resolution": "resolved"
    },
    "m-stale-tick": {
      "id": "m-stale-tick",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/reliability/stale-composer-recovery.ts",
      "symbol": "tickGuard",
      "role": "transformation",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/stale-composer-recovery.ts#L384-L427",
      "range": {
        "startLine": 384,
        "endLine": 427
      },
      "fingerprint": "2cbe6c339a4d96077d7c75a27722ee9b23ce333aecc586daa672598efef250c9",
      "excerpt": "  function tickGuard() {\n    if (!guard) return;\n    const snapshot = readComposerSnapshot();\n    const previous = guard.previousSnapshot;\n    if (previous?.exists && !snapshot.exists) {\n      guard.remountObserved = true;\n    }\n    if (!previous?.exists && snapshot.exists) {\n      guard.remountObserved = true;\n      resetQuietWindow(\"remount\", snapshot);\n    }\n    guard.previousSnapshot = snapshot;\n\n    if (!snapshot.exists || snapshot.textLength === 0) {\n      if (guard.phase === \"VERIFYING\" && snapshot.exists && snapshot.textLength === 0) {\n        markLocalClearObserved(snapshot);\n      }\n      if (guard.phase !== \"SETTLING\") guard.firstNonZeroAt = 0;",
      "access": "public",
      "resolution": "resolved"
    },
    "m-stale-delete": {
      "id": "m-stale-delete",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "extension/src/reliability/stale-composer-recovery.ts",
      "symbol": "nativeDeleteComposerContents / matchesOldPayload",
      "role": "transformation",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/extension/src/reliability/stale-composer-recovery.ts#L804-L833",
      "range": {
        "startLine": 804,
        "endLine": 833
      },
      "fingerprint": "2cbe6c339a4d96077d7c75a27722ee9b23ce333aecc586daa672598efef250c9",
      "excerpt": "  function nativeDeleteComposerContents(editable) {\n    if (!(editable instanceof HTMLElement)) return false;\n    try {\n      editable.focus({ preventScroll: true });\n    } catch (_error) {\n      editable.focus();\n    }\n    try {\n      if (editable instanceof HTMLTextAreaElement || editable instanceof HTMLInputElement) {\n        editable.setSelectionRange(0, editable.value.length);\n      } else {\n        const selection = getSelection();\n        const range = document.createRange();\n        range.selectNodeContents(editable);\n        selection.removeAllRanges();\n        selection.addRange(range);\n      }\n      return document.execCommand?.(\"delete\") === true || readComposerText(editable).length === 0;",
      "access": "public",
      "resolution": "resolved"
    },
    "m-hotpath-test": {
      "id": "m-hotpath-test",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "scripts/run-e2e.mjs",
      "symbol": "runTypingHotpathCase",
      "role": "test",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/scripts/run-e2e.mjs#L183-L222",
      "range": {
        "startLine": 183,
        "endLine": 222
      },
      "fingerprint": "8953dbd406d35c7239d87e85463cf0d93d993d0221d709cfd765cb36eccc9ee2",
      "excerpt": "async function runTypingHotpathCase() {\n  console.error(\"Running E2E case typing-hotpath@900px\");\n  const page = await browser.newPage({ viewport: { width: 900, height: 820 } });\n  const errors = [];\n  page.on(\"pageerror\", (error) => errors.push(String(error?.stack || error)));\n  page.on(\"console\", (message) => {\n    if (message.type() === \"error\") errors.push(message.text());\n  });\n  const url = `${baseUrl}/tests/fixtures/composer-typing-hotpath.html?t=${Date.now()}`;\n  let payload;\n  try {\n    await page.goto(url, { waitUntil: \"load\" });\n    await page.waitForFunction(() => {\n      const text = document.getElementById(\"typing-result\")?.textContent || \"\";\n      return text.trim().startsWith(\"{\");\n    }, null, { timeout: 15000 });\n    payload = JSON.parse(await page.locator(\"#typing-result\").textContent());\n  } catch (error) {",
      "access": "public",
      "resolution": "resolved"
    },
    "m-hotpath-fixture": {
      "id": "m-hotpath-fixture",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "tests/fixtures/composer-typing-hotpath.html",
      "symbol": "run / checks",
      "role": "test",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/tests/fixtures/composer-typing-hotpath.html#L191-L218",
      "range": {
        "startLine": 191,
        "endLine": 218
      },
      "fingerprint": "478a95db11890efea9e740dfa8c5398c86c373e2effb1cbf7a3af39f593efb8a",
      "excerpt": "        await waitFor(() => window.__MICA_TEST_CONTROLS__.getConnectorContinuityState()?.cachedSnapshotAvailable === true, 1500, stateText);\n        await delay(80);\n\n        const twenty = await measureTyping(\"abcdefghijklmnopqrst\");\n        const twoHundred = await measureTyping(\"x\".repeat(200));\n        const composition = await measureComposition(\"composition\");\n        const continuity = window.__MICA_TEST_CONTROLS__.getConnectorContinuityState();\n        const recovery = window.__MICA_TEST_CONTROLS__.getSendResidualRecoveryState();\n        const status = window.__MICA_TEST_CONTROLS__.getDiagnosticsReport();\n        const checks = [\n          [\"20 chars no clone\", twenty.delta.cloneNode === 0],\n          [\"200 chars no clone\", twoHundred.delta.cloneNode === 0],\n          [\"composition no clone\", composition.delta.cloneNode === 0],\n          [\"20 chars no computed style\", twenty.delta.getComputedStyle === 0],\n          [\"200 chars no computed style\", twoHundred.delta.getComputedStyle === 0],\n          [\"composition no computed style\", composition.delta.getComputedStyle === 0],\n          [\"document query all not linear\", twoHundred.delta.documentQuerySelectorAll <= twenty.delta.documentQuerySelectorAll + 2],\n          [\"document query selector not linear\", twoHundred.delta.documentQuerySelector <= twenty.delta.documentQuerySelector + 2],",
      "access": "public",
      "resolution": "resolved"
    },
    "m-stale-evidence": {
      "id": "m-stale-evidence",
      "kind": "code",
      "repository": "YuukiAS/Mica-for-ChatGPT",
      "commit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
      "path": "docs/investigations/2026-09-07-stale-composer-clear-recovery.md",
      "symbol": "What was confirmed / Fix",
      "role": "evidence",
      "url": "https://github.com/YuukiAS/Mica-for-ChatGPT/blob/7059c0dc24b908b57bd0e1f475142ba4f4520621/docs/investigations/2026-09-07-stale-composer-clear-recovery.md#L9-L41",
      "range": {
        "startLine": 9,
        "endLine": 41
      },
      "fingerprint": "cfee553eac37215e30e6eab374932c4b20c2d99e7729509330da2d0f6f48d323",
      "excerpt": "\nThe original `@GitHub` connector selection path can cause ChatGPT's own composer to briefly unmount/remount even when Mica runtime is disabled. That visual/native remount is not itself a Mica bug.\n\nThe real bug was stale draft restoration after the user explicitly cleared the composer:\n\n- a reliable clear anchor occurred while the composer was still present with `textLength = 0`;\n- ChatGPT then unmounted the composer;\n- a new composer root could remount with the previous non-zero payload restored;\n- Mica runtime OFF reports showed the same class of stale restoration, so the primary root cause is ChatGPT native connector composer lifecycle rather than Mica optimization.\n\nIntermediate 0.1.5 candidates narrowed the implementation bugs:\n\n- `.1` diagnostics proved reliable `present zero -> unmount -> remount nonzero` stale restoration.\n- `.2` fixed full-clear arming so `Ctrl+A -> Delete/Backspace` snapshots the complete pre-clear payload instead of an unrelated single-character delete.\n- `.3` added intent-scoped clear confirmation checks.\n- `.4` confirmed clear synchronously from the same editable's `blur`/`focusout`/`input` events.\n- `.5` fixed phase-aware timer handling so settling could finish after a late fingerprint match.\n- `.6` added a bounded tombstone so the same stale fingerprint can be cleared again across multiple subsequent native remounts.",
      "access": "public",
      "resolution": "resolved"
    },
    "cat-tail": {
      "id": "cat-tail",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "package/TRACE/src/ct_math.cpp",
      "symbol": "ct_tail_terms_scalar",
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/src/ct_math.cpp#L21-L91",
      "range": "21-L91",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-tail-test": {
      "id": "cat-tail-test",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "package/TRACE/tests/testthat/test-math-stability.R",
      "symbol": "ct_probit_tail_terms matches frozen high precision oracle",
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/tests/testthat/test-math-stability.R#L1-L24",
      "range": "1-L24",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-column": {
      "id": "cat-column",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "package/TRACE/src/ct_probit.cpp",
      "symbol": "ct_probit_laplace",
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/src/ct_probit.cpp#L111",
      "range": "111",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-observed": {
      "id": "cat-observed",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "package/TRACE/R/cat-trace-reference.R",
      "symbol": "ref_ct_observed_probit_log_likelihood",
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/R/cat-trace-reference.R#L857-L868",
      "range": "857-L868",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-collapsed": {
      "id": "cat-collapsed",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "package/TRACE/R/cat-trace-reference.R",
      "symbol": "ref_ct_eta_collapsed_contrast_log_density",
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/R/cat-trace-reference.R#L870-L902",
      "range": "870-L902",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-transition": {
      "id": "cat-transition",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "package/TRACE/R/cat-trace-reference.R",
      "symbol": "ref_ct_interweave_eta_collapsed_contrast",
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/R/cat-trace-reference.R#L950-L995",
      "range": "950-L995",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-sweep": {
      "id": "cat-sweep",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "package/TRACE/R/cat-trace-reference.R",
      "symbol": "ref_ct_one_sweep",
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/R/cat-trace-reference.R#L1028-L1052",
      "range": "1028-L1052",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-old-sweep": {
      "id": "cat-old-sweep",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "bea7aca3ba51bcd4883b9105765bfbbad5eddadc",
      "path": "package/TRACE/R/cat-trace-reference.R",
      "symbol": "ref_ct_one_sweep",
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/bea7aca3ba51bcd4883b9105765bfbbad5eddadc/package/TRACE/R/cat-trace-reference.R#L934-L958",
      "range": "934-L958",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-order-test": {
      "id": "cat-order-test",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "package/TRACE/tests/testthat/test-reference-c04-ref-v0-1-2.R",
      "symbol": "C4 one-sweep production order uses collapsed contrast slot",
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/tests/testthat/test-reference-c04-ref-v0-1-2.R#L296-L313",
      "range": "296-L313",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-stale-test": {
      "id": "cat-stale-test",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "package/TRACE/tests/testthat/test-reference-c04-ref-v0-1-2.R",
      "symbol": "C5 two-sweep production replay redraws Z after first collapsed writeback",
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/tests/testthat/test-reference-c04-ref-v0-1-2.R#L315-L337",
      "range": "315-L337",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-target-test": {
      "id": "cat-target-test",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "package/TRACE/tests/testthat/test-reference-c04-ref-v0-1-2.R",
      "symbol": "C2 collapsed contrast delta density matches independent full transformed oracle",
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/package/TRACE/tests/testthat/test-reference-c04-ref-v0-1-2.R#L253-L271",
      "range": "253-L271",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-result": {
      "id": "cat-result",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "results/c04-ref--z-collapsed-composition-repair/result.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/results/c04-ref--z-collapsed-composition-repair/result.md#L1-L34",
      "range": "1-L34",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-oracles": {
      "id": "cat-oracles",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "results/c04-ref--z-collapsed-composition-repair/tests/oracle_summary.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/results/c04-ref--z-collapsed-composition-repair/tests/oracle_summary.md",
      "range": null,
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-counterexample": {
      "id": "cat-counterexample",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "docs/implementation/probes/ZERO_SLOT_LAPLACE_FINDING.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/probes/ZERO_SLOT_LAPLACE_FINDING.md",
      "range": null,
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-counterexample-routine": {
      "id": "cat-counterexample-routine",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "docs/implementation/probes/zero_slot_laplace_probe.py",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/probes/zero_slot_laplace_probe.py",
      "range": null,
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-open": {
      "id": "cat-open",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "docs/implementation/architecture/CAT_TRACE_ZERO_SLOT_ARCHITECTURE_GUIDE_20261014.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/architecture/CAT_TRACE_ZERO_SLOT_ARCHITECTURE_GUIDE_20261014.md#L271-L279",
      "range": "271-L279",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-gap": {
      "id": "cat-gap",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "docs/implementation/07_DECISION_AND_GAP_LEDGER.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/07_DECISION_AND_GAP_LEDGER.md#L9-L37",
      "range": "9-L37",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "cat-change-contract": {
      "id": "cat-change-contract",
      "kind": "document",
      "repository": "YuukiAS/CAT-TRACE",
      "commit": "0d829fb17c458a076a15ec51893e917960107c21",
      "path": "docs/implementation/C04_REF_V0_1_2_Z_COLLAPSED_COMPOSITION_PLAN.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/CAT-TRACE/blob/0d829fb17c458a076a15ec51893e917960107c21/docs/implementation/C04_REF_V0_1_2_Z_COLLAPSED_COMPOSITION_PLAN.md#L8-L42",
      "range": "8-L42",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-architecture": {
      "id": "stat-architecture",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "76dc93ce7aaf2b91b60fd4003daa8be75ff54588",
      "path": "results/validator-system-architecture-research-20261022/02_OVERALL_ARCHITECTURE.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-system-architecture-research-20261022/02_OVERALL_ARCHITECTURE.md",
      "range": null,
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-impacts": {
      "id": "stat-impacts",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "76dc93ce7aaf2b91b60fd4003daa8be75ff54588",
      "path": "results/validator-system-architecture-research-20261022/03_THREE_FAMILY_EXECUTION.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-system-architecture-research-20261022/03_THREE_FAMILY_EXECUTION.md#L65-L92",
      "range": "65-L92",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-rules": {
      "id": "stat-rules",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "76dc93ce7aaf2b91b60fd4003daa8be75ff54588",
      "path": "results/validator-architecture-v3/RULE_EVIDENCE_TUTORIAL_DETAIL_V3.csv",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-architecture-v3/RULE_EVIDENCE_TUTORIAL_DETAIL_V3.csv",
      "range": null,
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-finding": {
      "id": "stat-finding",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "76dc93ce7aaf2b91b60fd4003daa8be75ff54588",
      "path": "results/validator-system-architecture-research-20261022/independent-acceptance-v1/REPAIR_TUTORIAL_SHARED_V1.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-system-architecture-research-20261022/independent-acceptance-v1/REPAIR_TUTORIAL_SHARED_V1.md#L7-L18",
      "range": "7-L18",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-review": {
      "id": "stat-review",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "76dc93ce7aaf2b91b60fd4003daa8be75ff54588",
      "path": "results/validator-system-architecture-research-20261022/independent-acceptance-v1/STAT5060_VALIDATOR_INDEPENDENT_ACCEPTANCE_REPORT_V1.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-system-architecture-research-20261022/independent-acceptance-v1/STAT5060_VALIDATOR_INDEPENDENT_ACCEPTANCE_REPORT_V1.md#L125-L142",
      "range": "125-L142",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-rate-code": {
      "id": "stat-rate-code",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "88d1214ea329f1e538301107c10bd8fd4fd8c341",
      "path": "scripts/presentation_validation/tutorial01_validator_adapter_v1/rule_registry_v3.py",
      "symbol": "scientific_observations",
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/88d1214ea329f1e538301107c10bd8fd4fd8c341/scripts/presentation_validation/tutorial01_validator_adapter_v1/rule_registry_v3.py#L53-L68",
      "range": "53-L68",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-entry-code": {
      "id": "stat-entry-code",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "88d1214ea329f1e538301107c10bd8fd4fd8c341",
      "path": "scripts/presentation_validation/tutorial01_validator_adapter_v1/validate_candidate_v2.py",
      "symbol": "validate_candidate",
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/88d1214ea329f1e538301107c10bd8fd4fd8c341/scripts/presentation_validation/tutorial01_validator_adapter_v1/validate_candidate_v2.py#L341-L362",
      "range": "341-L362",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-consume-code": {
      "id": "stat-consume-code",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "88d1214ea329f1e538301107c10bd8fd4fd8c341",
      "path": "scripts/presentation_validation/tutorial01_validator_adapter_v1/evaluator_consumer_v2.py",
      "symbol": "consume_result",
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/88d1214ea329f1e538301107c10bd8fd4fd8c341/scripts/presentation_validation/tutorial01_validator_adapter_v1/evaluator_consumer_v2.py#L254",
      "range": "254",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-page10": {
      "id": "stat-page10",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "88d1214ea329f1e538301107c10bd8fd4fd8c341",
      "path": "results/tutorial-01-v14/pages/page-10.png",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/88d1214ea329f1e538301107c10bd8fd4fd8c341/results/tutorial-01-v14/pages/page-10.png",
      "range": null,
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-v04": {
      "id": "stat-v04",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "76dc93ce7aaf2b91b60fd4003daa8be75ff54588",
      "path": "results/validator-foundation-v1/evidence/package/evidence/tutorial/T-V4.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-foundation-v1/evidence/package/evidence/tutorial/T-V4.md#L436-L450",
      "range": "436-L450",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-v05": {
      "id": "stat-v05",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "76dc93ce7aaf2b91b60fd4003daa8be75ff54588",
      "path": "results/validator-foundation-v1/evidence/package/evidence/tutorial/T-V5.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-foundation-v1/evidence/package/evidence/tutorial/T-V5.md#L179-L183",
      "range": "179-L183",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-human-finding": {
      "id": "stat-human-finding",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "76dc93ce7aaf2b91b60fd4003daa8be75ff54588",
      "path": "results/validator-foundation-v1/evidence/package/evidence/tutorial/T-INTAKE.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-foundation-v1/evidence/package/evidence/tutorial/T-INTAKE.md#L40-L46",
      "range": "40-L46",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-page35": {
      "id": "stat-page35",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "88d1214ea329f1e538301107c10bd8fd4fd8c341",
      "path": "results/tutorial-01-v14/pages/page-35.png",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/88d1214ea329f1e538301107c10bd8fd4fd8c341/results/tutorial-01-v14/pages/page-35.png",
      "range": null,
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-page37": {
      "id": "stat-page37",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "88d1214ea329f1e538301107c10bd8fd4fd8c341",
      "path": "results/tutorial-01-v14/pages/page-37.png",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/88d1214ea329f1e538301107c10bd8fd4fd8c341/results/tutorial-01-v14/pages/page-37.png",
      "range": null,
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-timetable": {
      "id": "stat-timetable",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "76dc93ce7aaf2b91b60fd4003daa8be75ff54588",
      "path": "docs/frozen/2026-27/STAT5060_ASSESSMENT_TIMETABLE_V1.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/docs/frozen/2026-27/STAT5060_ASSESSMENT_TIMETABLE_V1.md#L1-L43",
      "range": "1-L43",
      "access": "source_permissions",
      "resolution": "resolved"
    },
    "stat-recorded-stale": {
      "id": "stat-recorded-stale",
      "kind": "document",
      "repository": "YuukiAS/STAT5060-TA",
      "commit": "76dc93ce7aaf2b91b60fd4003daa8be75ff54588",
      "path": "results/validator-system-architecture-research-20261022/03_THREE_FAMILY_EXECUTION.md",
      "symbol": null,
      "role": "source",
      "url": "https://github.com/YuukiAS/STAT5060-TA/blob/76dc93ce7aaf2b91b60fd4003daa8be75ff54588/results/validator-system-architecture-research-20261022/03_THREE_FAMILY_EXECUTION.md#L75-L92",
      "range": "75-L92",
      "access": "source_permissions",
      "resolution": "resolved"
    }
  },
  "mica": {
    "mechanisms": [
      {
        "id": "mica.dom",
        "label": "识别对话与输入框",
        "summary": "从已挂载页面识别消息轮次，并排除输入框及扩展自身节点。",
        "design": "accepted",
        "implementation": "linked",
        "evidence": "source_checked",
        "anchors": [
          "m-selectors",
          "m-turns"
        ],
        "steps": [
          "用 TURN_SELECTOR 发现候选消息节点",
          "按角色节点向上寻找 conversation-turn 或 article 容器",
          "排除不可见、输入框保护区与 Mica 自身节点",
          "去重并按页面顺序返回"
        ],
        "selector": "[data-message-author-role], [data-testid^='conversation-turn-'], [data-testid*='conversation-turn']",
        "failure": "结构不可靠时保持原生页面，由扫描器进入降级状态。"
      },
      {
        "id": "mica.scan",
        "label": "长对话扫描",
        "summary": "只为安全识别且远离视口的历史轮次减轻渲染，输入、工具和授权区域保持原生行为。",
        "design": "accepted",
        "implementation": "linked",
        "evidence": "source_and_test_defined",
        "anchors": [
          "m-schedule",
          "m-scan",
          "m-protect"
        ],
        "steps": [
          "scheduleScan 合并请求到下一帧",
          "输入编辑窗口内跳过扫描；不支持 content-visibility 时退出",
          "识别失败、结构不明或轮次少于阈值时进入原生安全模式",
          "保护最近 8 轮、视口附近、流式及特殊交互内容",
          "仅对远离视口且未受保护轮次使用 containment"
        ],
        "bounds": [
          "默认小窗口阈值 14",
          "默认保留最近 8 轮",
          "默认视口缓冲倍数 1.75"
        ],
        "failure": "clearOptimization 后进入 Degraded/Native only；不删除 React 消息节点。",
        "unchanged": [
          "输入区域不参与优化",
          "工具与授权界面保留",
          "关闭后恢复原生行为"
        ],
        "tests": [
          "tests/fixtures/long-thread.html",
          "tests/fixtures/composer-lifecycle.html"
        ]
      },
      {
        "id": "mica.signal",
        "label": "连接器事件识别",
        "summary": "将 @ 输入、选择动作和连接器标记转成短期共享状态。",
        "design": "accepted",
        "implementation": "linked",
        "evidence": "focused_synthetic_regression_passed",
        "anchors": [
          "m-signal",
          "m-event",
          "m-fast"
        ],
        "steps": [
          "普通按键和一般输入在 isPotentialConnectorEvent 返回",
          "只在 @、Enter、focus/click/pointerdown 等候选事件识别结构",
          "建立含 latchId、来源、期限、输入框身份和矩形的状态",
          "dispatchLatchEvent 广播给连续显示和发送残留恢复模块"
        ],
        "event": "mica-connector-lifecycle-latched",
        "payload": [
          "latchId",
          "source",
          "connectorContextLatched",
          "chooserActiveNow",
          "selectionWindowActive",
          "composerRootId",
          "editableId",
          "lastComposerRect",
          "ttlMs"
        ],
        "failure": "识别不足不启动连接器恢复，不干预原生连接器选择。"
      },
      {
        "id": "mica.continuity",
        "label": "连接器切换连续显示",
        "summary": "原生输入框短暂卸载时，使用已消毒的只读快照维持视觉连续。",
        "design": "accepted",
        "implementation": "linked",
        "evidence": "focused_synthetic_regression_passed",
        "anchors": [
          "m-continuity",
          "m-cache",
          "m-shell",
          "m-skip"
        ],
        "steps": [
          "消费共享连接器事件，在短期生命周期内观察结构变化",
          "下一帧合并刷新，输入框与连接器标记未变化则复用快照",
          "原生输入框消失且快照仍新鲜时显示 inert、aria-hidden、pointer-events:none 的外观层",
          "输入框返回时移除外观层；发送或清空恢复活动时不再新建；导航或超时清理"
        ],
        "bounds": [
          "观察窗口 4200 ms",
          "快照新鲜度 2500 ms",
          "外观层硬上限 2000 ms"
        ],
        "failure": "没有新鲜快照或矩形时不新建外观层；发送模块处于活动、候选发送或已提交任一状态，以及清空恢复活动时也不新建。已有外观层不因此立即移除。",
        "unchanged": [
          "外观层不可编辑",
          "外观层不拦截点击",
          "原生输入框所有交互由 ChatGPT 保留"
        ],
        "tests": [
          "scripts/run-e2e.mjs::runTypingHotpathCase",
          "tests/fixtures/connector-mention-lifecycle.html"
        ]
      },
      {
        "id": "mica.stale",
        "label": "清空后旧草稿恢复",
        "summary": "用户明确清空后，若同一旧内容被原生重挂载恢复，则在短窗口内再次清空。",
        "design": "accepted",
        "implementation": "linked",
        "evidence": "historical_manual_report_with_limits",
        "anchors": [
          "m-stale-intent",
          "m-stale-confirm",
          "m-stale-tick",
          "m-stale-delete",
          "m-stale-evidence"
        ],
        "steps": [
          "确认全选删除或剪切意图并保存本地旧内容指纹",
          "从同一输入对象确认内容长度为零后才启动守护",
          "等待原生卸载/重挂载，匹配同一旧内容并等待短暂稳定",
          "用浏览器原生删除命令清空，复核并观察安静窗口",
          "任何新的输入、粘贴或输入法动作立即取消"
        ],
        "states": [
          "WAITING_FOR_REMOUNT",
          "SETTLING",
          "RECOVERING",
          "VERIFYING"
        ],
        "bounds": [
          "最多 3 次恢复",
          "硬期限 12000 ms",
          "安静窗口 1400 ms"
        ],
        "failure": "指纹不匹配、没有可靠清空确认或用户继续输入时停止；不自动发送。",
        "tests": [
          "tests/fixtures/composer-guided-diagnostics.html",
          "tests/fixtures/connector-mention-lifecycle.html"
        ]
      }
    ],
    "relations": [
      {
        "id": "mica.dom-scan",
        "source": "mica.dom",
        "target": "mica.scan",
        "type": "passes_to",
        "payload": "已挂载、安全识别、去重排序的 HTMLElement[]",
        "consumer": "scanAndApply",
        "anchors": [
          "m-turns",
          "m-scan"
        ]
      },
      {
        "id": "mica.signal-continuity",
        "source": "mica.signal",
        "target": "mica.continuity",
        "type": "emits",
        "payload": "mica-connector-lifecycle-latched 的 publicLatch() 状态",
        "consumer": "handleSharedConnectorLifecycle",
        "anchors": [
          "m-event",
          "m-continuity"
        ]
      },
      {
        "id": "mica.stale-continuity",
        "source": "mica.stale",
        "target": "mica.continuity",
        "type": "constrains",
        "payload": "getState() 的 armed / guardActive / tombstoneActive / phase",
        "consumer": "continuitySkipReason → isStaleClearRecoveryActive",
        "anchors": [
          "m-skip"
        ]
      }
    ],
    "revision": {
      "id": "mica-0.1.6-to-0.1.7",
      "beforeVersion": "0.1.6",
      "beforeCommit": "9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0",
      "afterVersion": "0.1.7",
      "afterCommit": "aa4ce52581fff2e207d1f93600becbb3018b0efc",
      "title": "把重型快照移出普通输入路径",
      "trigger": "连接器状态锁定后，每次普通输入都可能重复发现输入框、复制 DOM 和计算样式，拖慢输入。",
      "triggerEvidence": "README.md:85 的修复说明与 aa4ce52 代码差异相互吻合；不假定具体用户延迟测量值。",
      "compareUrl": "https://github.com/YuukiAS/Mica-for-ChatGPT/compare/9f56ea8d23a0895ddbb3f1e95ee207bd049b62c0...aa4ce52581fff2e207d1f93600becbb3018b0efc",
      "changes": [
        {
          "target": "mica.continuity",
          "before": "监听 6 类输入/交互事件；handlePotentialMentionEvent 检测到连接器上下文后同步调用 beginLifecycle 重建快照，另有 60ms 轮询。",
          "after": "消费一次共享连接器事件与短期结构变化，下一帧合并刷新；相同 surface 和 pill signature 复用快照。",
          "reason": "把重型 DOM 工作从按键同步路径移走。",
          "impact": [
            "连续显示调度",
            "诊断性能计数",
            "连接器生命周期 fixture"
          ]
        },
        {
          "target": "mica.signal",
          "before": "输入事件调用 detectSignal，publicLatch 查询候选列表。",
          "after": "普通输入先过滤，publicLatch 读取已有短期状态。",
          "reason": "读取连接器状态应具有固定低成本。",
          "impact": [
            "连接器识别",
            "发送残留恢复调用方"
          ]
        },
        {
          "target": "mica.continuity",
          "before": "已有外观层行为缺少普通输入性能专门回归。",
          "after": "增加 20/200 字和 IME 合成用例，断言不 clone、不读 computed style、无轮询。",
          "reason": "功能正确不足以保护打字体验。",
          "impact": [
            "tests/fixtures/composer-typing-hotpath.html",
            "scripts/run-e2e.mjs"
          ]
        }
      ],
      "unchangedGuarantees": [
        "外观层保持 inert、aria-hidden 与 pointer-events:none，原生输入框承担交互",
        "新建外观层前必须有矩形和快照，快照年龄不超过 2500 ms",
        "关闭功能会撤销监听，清理既有外观层及相应调度"
      ],
      "evidenceAnchors": [
        "m-hotpath-test",
        "m-hotpath-fixture"
      ],
      "evidenceBoundary": "已核对固定提交代码差异，且在当前 main 对应 dist 实际运行既有本地 typing-hotpath 合成用例，13 项通过。真实 ChatGPT/目标设备验收另计。"
    },
    "openIssues": [
      {
        "label": "真实设备性能收益尚需当前证据",
        "reason": "既有 README 明确 local fixture 不能证明当前真实 ChatGPT 长对话性能；本轮未访问登录态。"
      },
      {
        "label": "ChatGPT DOM 变化仍会使结构锚点失效",
        "reason": "selector 是固定版本源码中的定位规则，并非服务端稳定 API。"
      }
    ],
    "evidence": [
      {
        "id": "mica-hotpath-20261027",
        "kind": "mechanical",
        "label": "连接器锁定后的普通输入回归",
        "subjectCommit": "7059c0dc24b908b57bd0e1f475142ba4f4520621",
        "method": "既有 runTypingHotpathCase，本地合成页面，900×820，Chrome for Testing 131.0.6778.204",
        "result": "13 项通过；20/200 字与 IME 的 cloneNode、computed style、全页查询增量均为 0；无页面错误。",
        "supports": [
          "mica.signal",
          "mica.continuity"
        ],
        "doesNotEstablish": "当前真实 ChatGPT DOM 兼容性、MacBook Neo 性能收益、全部 Mica 功能。",
        "artifact": "typing_hotpath.json",
        "reviewer": "本轮 pro-a 制作者事实检查"
      }
    ]
  },
  "scienceProjects": [
    {
      "id": "cat-trace",
      "title": "CAT-TRACE",
      "subtitle": "把科学模型、数值方法和验证范围分开看。",
      "public_safe": true,
      "components": [
        {
          "id": "cat-model",
          "label": "科学模型",
          "kind": "model",
          "design": "accepted",
          "implementation": "partial",
          "evidence": "scoped",
          "summary": "目录中的已知对象与尚未发现的对象有不同身份；共享参数连接它们。"
        },
        {
          "id": "cat-data",
          "label": "输入与身份",
          "kind": "contract",
          "design": "accepted",
          "implementation": "present",
          "evidence": "scoped",
          "summary": "固定样本、特征、分组和有限工作集合。"
        },
        {
          "id": "cat-tail",
          "label": "尾部数值内核",
          "kind": "routine",
          "design": "accepted",
          "implementation": "present",
          "evidence": "repository_tests",
          "summary": "在极端正态尾部稳定计算概率及曲率。",
          "anchors": [
            "cat-tail",
            "cat-tail-test",
            "cat-column"
          ],
          "mechanism": {
            "renderer": "algorithm",
            "steps": [
              "识别普通区间与极端尾部",
              "选择稳定的等价表达",
              "补偿求和并检查有限值",
              "将概率、比率与曲率交给单列拟合"
            ],
            "formula": "\\lambda(t)=\\phi(t)/\\Phi(t)",
            "formula_meaning": "逆 Mills 比率参与 probit 的导数计算。",
            "public_formula": true
          }
        },
        {
          "id": "cat-reference",
          "label": "参考采样器",
          "kind": "algorithm",
          "design": "accepted",
          "implementation": "present",
          "evidence": "correctness_scoped_reliability_unmet",
          "summary": "独立参考算法已有实现，正式可靠性要求仍未满足。",
          "anchors": [
            "cat-observed",
            "cat-collapsed",
            "cat-transition",
            "cat-sweep",
            "cat-result"
          ],
          "mechanism": {
            "renderer": "algorithm",
            "steps": [
              "更新潜变量和参数块",
              "用观测似然更新组间组成",
              "回写相关参数",
              "下一轮重新抽取潜变量"
            ],
            "formula": "\\ell=\\sum_{i,j}\\log\\Phi\\!\\left[(2y_{ij}-1)\\eta_{ij}\\right]",
            "formula_meaning": "对二元观测直接计算标准 probit 对数似然。",
            "public_formula": true
          }
        },
        {
          "id": "cat-zero",
          "label": "匿名零槽位积分",
          "kind": "algorithm",
          "design": "proposed",
          "implementation": "absent",
          "evidence": "blocked",
          "summary": "已有新的数学候选；误差、导数与成本仍需联合验证。",
          "anchors": [
            "cat-open",
            "cat-gap"
          ],
          "blocker": "生产算法与正式校准尚未冻结。",
          "mechanism": {
            "renderer": "algorithm",
            "steps": [
              "保留未观测槽位对模型的贡献",
              "对每组计算全零事件概率",
              "按重数合并到共享目标",
              "用独立方法核对积分与导数"
            ],
            "execution_ready": false
          }
        },
        {
          "id": "cat-laplace-withdrawn",
          "label": "旧零列近似",
          "kind": "algorithm",
          "design": "superseded",
          "implementation": "not_adopted_for_zero_slots",
          "evidence": "counterexample",
          "summary": "局部近似遗漏尾部贡献；聚合会放大其误差。",
          "anchors": [
            "cat-counterexample",
            "cat-counterexample-routine"
          ],
          "visible_by_default": false
        },
        {
          "id": "cat-validation",
          "label": "独立数值参照",
          "kind": "evidence_role",
          "design": "accepted",
          "implementation": "present",
          "evidence": "scoped",
          "summary": "聚合等价、积分准确、截断误差和统计可靠性分别判断。",
          "anchors": [
            "cat-target-test",
            "cat-stale-test",
            "cat-oracles"
          ]
        }
      ],
      "relations": [
        {
          "source": "cat-data",
          "target": "cat-tail",
          "verb": "提供",
          "payload": "二元响应、设计矩阵、单列先验",
          "consumer": "ct_probit_laplace"
        },
        {
          "source": "cat-tail",
          "target": "cat-model",
          "verb": "返回",
          "payload": "单列概率、众数和曲率",
          "consumer": "显式列拟合"
        },
        {
          "source": "cat-zero",
          "target": "cat-model",
          "verb": "贡献",
          "payload": "按重数加权的全零事件项",
          "consumer": "共享参数目标",
          "status": "planned"
        },
        {
          "source": "cat-reference",
          "target": "cat-validation",
          "verb": "提供",
          "payload": "参考抽样与诊断",
          "consumer": "独立验证",
          "warning": "参考链可靠性未满足时，不可作为金标准"
        },
        {
          "source": "cat-validation",
          "target": "cat-zero",
          "verb": "约束",
          "payload": "准确性、误差与成本要求",
          "consumer": "算法设计",
          "status": "open"
        }
      ],
      "revisions": [
        {
          "id": "cat-v011-v012",
          "label": "参考采样器 0.1.1 → 0.1.2",
          "before_commit": "bea7aca3ba51bcd4883b9105765bfbbad5eddadc",
          "after_commit": "2ccb9f9b3c67258292e3b39faeadb4a6c8fef03b",
          "current_source_commit": "0d829fb17c458a076a15ec51893e917960107c21",
          "component": "cat-reference",
          "trigger": "正式可靠性失败后的机制检查。",
          "reason": "潜变量条件限制了组间组成更新；仅替换对应更新步骤。",
          "before": "在当前潜变量条件下更新组成对比。",
          "after": "把潜变量积分掉，使用观测似然更新组成对比。",
          "changed": [
            "组成对比的目标函数",
            "参数回写与下一轮的更新关系"
          ],
          "unchanged": [
            "科学模型",
            "先验",
            "固定比较输入",
            "对外接口",
            "已有数值内核"
          ],
          "evidence": [
            "cat-change-contract",
            "cat-old-sweep",
            "cat-sweep",
            "cat-target-test",
            "cat-order-test",
            "cat-stale-test",
            "cat-result"
          ],
          "outcome": "正确性检查有记录；正式可靠性仍未满足。",
          "invalidation": "旧更新核的运行诊断不能代替新核的可靠性证据。"
        },
        {
          "id": "cat-zero-withdrawal",
          "label": "撤销普通零列局部近似",
          "component": "cat-zero",
          "trigger": "独立解析与高精度数值反例。",
          "before": "把普通单列局部近似用于匿名全零列。",
          "after": "保留模型目标，重新设计零事件积分。",
          "reason": "单列尾部误差会随槽位重数放大。",
          "evidence": [
            "cat-counterexample",
            "cat-open"
          ],
          "outcome": "旧路线撤销；后续候选未获得生产冻结。",
          "unchanged": [
            "未发现槽位仍进入模型",
            "聚合的代数等价",
            "显式列数值内核"
          ]
        }
      ]
    },
    {
      "id": "stat5060",
      "title": "STAT5060 Tutorial",
      "subtitle": "从一个具体问题追到页面、要求和修复范围。",
      "public_safe": true,
      "components": [
        {
          "id": "tutorial-candidate",
          "label": "候选课件",
          "kind": "artifact",
          "design": "accepted",
          "implementation": "artifact_present",
          "evidence": "partial",
          "summary": "源文件、PDF、页图及页序共同确定被检查的版本。",
          "anchors": [
            "stat-page10",
            "stat-architecture"
          ]
        },
        {
          "id": "tutorial-authority",
          "label": "当前教学要求",
          "kind": "requirement_set",
          "design": "accepted",
          "implementation": "present",
          "evidence": "source_bound",
          "summary": "当前决定优先；历史反馈只在仍适用的范围内保留。",
          "anchors": [
            "stat-rules",
            "stat-human-finding"
          ]
        },
        {
          "id": "tutorial-mechanical",
          "label": "统计与文件核对",
          "kind": "validator",
          "design": "accepted",
          "implementation": "present_with_known_defect",
          "evidence": "scoped",
          "summary": "文件身份、统计对象、计算结果与复制执行分别核对。",
          "anchors": [
            "stat-rate-code",
            "stat-entry-code"
          ],
          "mechanism": {
            "renderer": "sequence",
            "steps": [
              "读取绑定的数据对象",
              "按声明核对统计量",
              "记录实际值与预期",
              "将问题关联到对象和要求"
            ]
          }
        },
        {
          "id": "tutorial-page",
          "label": "整页审阅",
          "kind": "review",
          "design": "accepted",
          "implementation": "partial",
          "evidence": "not_accepted",
          "summary": "判断图、文字、公式与留白是否共同服务这页的学习目标。",
          "anchors": [
            "stat-rules",
            "stat-review"
          ],
          "mechanism": {
            "renderer": "artifact",
            "slots": [
              "题干",
              "主要证据",
              "解释"
            ],
            "illustration": "结构示意，不是课程原页。"
          }
        },
        {
          "id": "tutorial-sequence",
          "label": "整套阅读",
          "kind": "review",
          "design": "accepted",
          "implementation": "partial",
          "evidence": "not_accepted",
          "summary": "检查定义、使用、例子与转场在当前顺序中是否成立。",
          "anchors": [
            "stat-impacts",
            "stat-review"
          ]
        },
        {
          "id": "tutorial-finding",
          "label": "问题与修复",
          "kind": "finding_set",
          "design": "accepted",
          "implementation": "partial",
          "evidence": "open",
          "summary": "问题回到原制作任务，修复后重新绑定版本与证据。",
          "anchors": [
            "stat-finding",
            "stat-consume-code"
          ]
        },
        {
          "id": "tutorial-rerender",
          "label": "重新渲染与复验",
          "kind": "repair",
          "design": "accepted",
          "implementation": "workflow_not_accepted",
          "evidence": "missing_real_closure",
          "summary": "变更涉及哪些输入，就更新哪些证据；保护未变内容。",
          "anchors": [
            "stat-impacts",
            "stat-review"
          ]
        }
      ],
      "relations": [
        {
          "source": "tutorial-candidate",
          "target": "tutorial-mechanical",
          "verb": "交付",
          "payload": "精确文件身份、页序、数据和执行记录",
          "consumer": "统计与文件核对"
        },
        {
          "source": "tutorial-authority",
          "target": "tutorial-mechanical",
          "verb": "约束",
          "payload": "当前要求与对象范围",
          "consumer": "验证入口"
        },
        {
          "source": "tutorial-candidate",
          "target": "tutorial-page",
          "verb": "供审阅",
          "payload": "整页渲染、对象定位及必要邻页",
          "consumer": "独立页级审阅"
        },
        {
          "source": "tutorial-candidate",
          "target": "tutorial-sequence",
          "verb": "供审阅",
          "payload": "完整有序页图与概念依赖",
          "consumer": "整套教学审阅"
        },
        {
          "source": "tutorial-mechanical",
          "target": "tutorial-finding",
          "verb": "报告",
          "payload": "实际事实、预期、对象和要求",
          "consumer": "原制作任务"
        },
        {
          "source": "tutorial-page",
          "target": "tutorial-finding",
          "verb": "报告",
          "payload": "具体阅读障碍与位置",
          "consumer": "原制作任务"
        },
        {
          "source": "tutorial-sequence",
          "target": "tutorial-finding",
          "verb": "报告",
          "payload": "遗漏、先修或转场问题",
          "consumer": "原制作任务"
        },
        {
          "source": "tutorial-finding",
          "target": "tutorial-rerender",
          "verb": "限定修复",
          "payload": "允许改动、受保护内容和待复验证据",
          "consumer": "原制作任务"
        },
        {
          "source": "tutorial-rerender",
          "target": "tutorial-candidate",
          "verb": "生成",
          "payload": "新的产物版本及变更对应",
          "consumer": "同一验证入口"
        }
      ],
      "findings": [
        {
          "id": "tutorial-v14-obsolete-assessment",
          "title": "课件还在使用旧考核安排",
          "status": "open_current_authority",
          "attribution": "artifact_authority_drift",
          "discovered_by": "既有架构研究；本轮再次核对原页与当前课程决定",
          "subject": "tutorial-candidate",
          "object": "V14 第35页考核表、第37页项目安排",
          "requirements": [
            "T14",
            "当前课程安排"
          ],
          "source": "stat-recorded-stale",
          "artifact_anchors": [
            "stat-page35",
            "stat-page37"
          ],
          "authority_anchor": "stat-timetable",
          "explanation": "当前课程决定已替换旧安排，已有课件仍保留被撤销的项目。",
          "repair_proposal": "按当前课程决定更新相关表格和说明，保留已接受的教学内容及模板。",
          "protected": [
            "统计教学对象",
            "无关页面内容",
            "已接受的课程模板"
          ],
          "repair_completed": false,
          "required_after_repair": [
            "相关页面重新渲染",
            "所有学生可见课程事实核对",
            "完整教学顺序复核",
            "未改内容保护"
          ],
          "evidence_kind": "direct_render_and_authority_comparison",
          "scope_limit": "这是旧候选与当前要求之间的差异，不追溯宣称其原制作时违反当时要求。"
        },
        {
          "id": "IVA-T-001",
          "title": "合法零计数使验证器退出",
          "status": "open",
          "attribution": "validator_defect",
          "discovered_by": "独立验收审查",
          "subject": "tutorial-mechanical",
          "object": "offset 统计对象",
          "requirements": [
            "T03",
            "T09"
          ],
          "source": "stat-finding",
          "code": "stat-rate-code",
          "explanation": "验证器先计算所有比值，再检查本次声明；首项为零会使合法的逐项率核对中断。",
          "repair_proposal": "按实际声明决定是否计算比值，并处理分母为零的未定义情形。",
          "protected": [
            "保留合法零计数",
            "不以任意小常数替代分母",
            "不改课程数据",
            "不改冻结要求"
          ],
          "repair_completed": false,
          "required_after_repair": [
            "对应定义域的回归",
            "既有正数对象回归",
            "正常入口返回结构化结果"
          ],
          "evidence_kind": "static_control_flow_and_review",
          "display_note": "这是验证器缺陷，不是对课件内容的判错。"
        },
        {
          "id": "tutorial-v04-p26",
          "title": "课程页暴露内部制作状态",
          "status": "historical_locally_corrected",
          "attribution": "artifact_content",
          "discovered_by": "历史逐页审阅",
          "subject": "tutorial-candidate",
          "object": "V04 第26页的项目说明",
          "requirements": [
            "学生可见内容只保留当前需要知道的信息"
          ],
          "source": "stat-v04",
          "after_source": "stat-v05",
          "explanation": "旧页使用制作状态组织课程说明；后版审阅记录该问题已移除。",
          "repair_completed": "documented_local_content_only",
          "scope_limit": "后版仍有视觉与解释不足；此记录不等于整页或整套通过。"
        }
      ],
      "revisions": [
        {
          "id": "tutorial-historical-content",
          "label": "项目说明的局部返修",
          "before": "V04 第26页",
          "after": "V05 第26页",
          "trigger": "逐页审阅指出学生页暴露内部制作状态。",
          "change": "移除内部制作状态，保留学生需知的项目要求。",
          "evidence": [
            "stat-v04",
            "stat-v05"
          ],
          "unchanged": [
            "课程事实仍需来源支持",
            "未获准的课程政策不能补写"
          ],
          "outcome": "历史记录确认局部内容已修，视觉仍需改进。",
          "current_acceptance": false
        },
        {
          "id": "tutorial-repair-plan",
          "label": "零计数缺陷的修复方案",
          "is_simulation": true,
          "trigger": "IVA-T-001",
          "before": "合法统计对象可能让验证器直接退出。",
          "after": "在声明范围内计算，未定义比值返回明确问题。",
          "outcome": "尚未实施；仅演示修复范围与证据依赖。",
          "evidence": [
            "stat-finding"
          ]
        }
      ],
      "impact_cases": [
        {
          "change": "只改一页解释",
          "invalidate": [
            "该对象统计解释",
            "整页及必要邻页阅读",
            "完整新课件顺序"
          ],
          "retain_if_equal": [
            "未变统计输入的拟合结果",
            "未受影响的源资产"
          ],
          "source": "stat-impacts"
        },
        {
          "change": "改共享问答样式",
          "invalidate": [
            "使用该样式的全部页图与页面视觉判断"
          ],
          "retain_if_equal": [
            "统计输入和计算结果"
          ],
          "source": "stat-impacts"
        },
        {
          "change": "只交换两页",
          "invalidate": [
            "完整教学顺序与先修关系判断"
          ],
          "retain_if_equal": [
            "单页图像字节",
            "独立数值计算"
          ],
          "source": "stat-impacts"
        },
        {
          "change": "改统计模型或数据",
          "invalidate": [
            "计算结果",
            "依赖图表",
            "相关解释",
            "受影响评分和整体阅读"
          ],
          "retain_if_equal": [],
          "source": "stat-architecture"
        }
      ]
    }
  ]
};
