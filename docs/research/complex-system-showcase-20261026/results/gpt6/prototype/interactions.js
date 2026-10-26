/* Local explanatory state only: no requests, storage, production calls or telemetry. */
(() => {
  const controls = document.querySelector('.scenario-controls');
  const buttons = Array.from(document.querySelectorAll('[data-scenario]'));
  const panels = Array.from(document.querySelectorAll('[data-panel]'));
  const announcement = document.getElementById('scenario-announcement');
  const labels = {good:'符合要求：证据齐全才可交付。',bad:'掩盖真故障：拒绝候选，并将反馈交回原任务。',regression:'旧功能退化：拒绝候选，重新检查受影响的旧行为。'};
  function selectScenario(id, announce) {
    if (!Object.hasOwn(labels, id)) id = 'good';
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.scenario === id));
    for (const panel of panels) panel.hidden = panel.dataset.panel !== id;
    if (announce) announcement.textContent = '设计推演，' + labels[id];
  }
  for (const button of buttons) button.addEventListener('click', () => selectScenario(button.dataset.scenario, true));
  controls.hidden = false;
  selectScenario(new URLSearchParams(location.search).get('scenario') || 'good', false);
})();
