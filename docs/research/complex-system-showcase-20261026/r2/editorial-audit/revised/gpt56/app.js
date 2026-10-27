(() => {
  const model = window.DA_MODEL;
  const nodeById = new Map(model.nodes.map((node) => [node.id, node]));
  const edgeById = new Map(model.edges.map((edge) => [edge.id, edge]));

  const nodeLayer = document.getElementById('node-layer');
  const edgeLayer = document.getElementById('edge-layer');
  const mobileGraph = document.getElementById('mobile-graph');
  const live = document.getElementById('live-announcement');

  const inspector = {
    type: document.getElementById('inspector-type'),
    status: document.getElementById('inspector-status'),
    title: document.getElementById('inspector-title'),
    summary: document.getElementById('inspector-summary'),
    details: document.getElementById('inspector-details'),
    scenarioTitle: document.getElementById('inspector-scenario-title'),
    next: document.getElementById('inspector-next')
  };

  const scenarioEls = {
    title: document.getElementById('scenario-title'),
    summary: document.getElementById('scenario-summary')
  };

  let selected = { type: 'node', id: 'da' };
  let selectionFocused = false;
  let activeScenario = 'success';

  function statusClass(status) {
    return ['existing', 'partial', 'proposed', 'pending'].includes(status) ? status : 'pending';
  }

  function renderNodes() {
    nodeLayer.innerHTML = '';
    model.nodes.forEach((node) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `diagram-node kind-${node.kind} status-${statusClass(node.status)}`;
      button.dataset.nodeId = node.id;
      button.style.left = `${(node.x / 1280) * 100}%`;
      button.style.top = `${(node.y / 640) * 100}%`;
      button.style.width = `${(node.w / 1280) * 100}%`;
      button.style.height = `${(node.h / 640) * 100}%`;
      button.setAttribute('aria-label', `${node.label}，${node.statusLabel}`);
      button.innerHTML = `
        <span class="node-step" aria-hidden="true"></span>
        <span class="node-title">${node.label}</span>
        <span class="node-subtitle">${node.subtitle}</span>
        <span class="node-state">${node.statusLabel}</span>
      `;
      button.addEventListener('click', () => selectNode(node.id, true));
      nodeLayer.appendChild(button);
    });
  }

  function renderEdges() {
    const ns = 'http://www.w3.org/2000/svg';
    edgeLayer.innerHTML = `
      <defs>
        <marker id="arrow-normal" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"></path></marker>
        <marker id="arrow-success" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"></path></marker>
        <marker id="arrow-failure" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"></path></marker>
        <marker id="arrow-optional" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"></path></marker>
      </defs>
    `;

    model.edges.forEach((edge) => {
      const group = document.createElementNS(ns, 'g');
      group.classList.add('edge-group', `edge-${edge.kind}`, `edge-state-${edge.state}`);
      group.dataset.edgeId = edge.id;

      const visible = document.createElementNS(ns, 'path');
      visible.classList.add('edge-visible');
      visible.setAttribute('d', edge.d);
      visible.setAttribute('marker-end', `url(#arrow-${['success', 'failure', 'optional'].includes(edge.kind) ? edge.kind : 'normal'})`);

      const hit = document.createElementNS(ns, 'path');
      hit.classList.add('edge-hit');
      hit.setAttribute('d', edge.d);
      hit.setAttribute('tabindex', '0');
      hit.setAttribute('role', 'button');
      hit.setAttribute('aria-label', `${edge.label}：${nodeById.get(edge.from).label} 到 ${nodeById.get(edge.to).label}`);
      hit.addEventListener('click', () => selectEdge(edge.id, true));
      hit.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectEdge(edge.id, true);
        }
      });

      const labelGroup = document.createElementNS(ns, 'g');
      labelGroup.classList.add('edge-label-group');
      labelGroup.setAttribute('transform', `translate(${edge.labelX} ${edge.labelY})`);

      const labelText = document.createElementNS(ns, 'text');
      labelText.classList.add('edge-label');
      labelText.setAttribute('text-anchor', 'middle');
      labelText.textContent = edge.label;

      const bboxWidth = Math.max(58, edge.label.length * 12 + 18);
      const labelBg = document.createElementNS(ns, 'rect');
      labelBg.classList.add('edge-label-bg');
      labelBg.setAttribute('x', `${-bboxWidth / 2}`);
      labelBg.setAttribute('y', '-13');
      labelBg.setAttribute('width', `${bboxWidth}`);
      labelBg.setAttribute('height', '21');
      labelBg.setAttribute('rx', '5');

      labelGroup.append(labelBg, labelText);

      if (edge.state === 'pending') {
        const pending = document.createElementNS(ns, 'text');
        pending.classList.add('edge-pending');
        pending.setAttribute('text-anchor', 'middle');
        pending.setAttribute('x', '0');
        pending.setAttribute('y', '21');
        pending.textContent = '待接线';
        labelGroup.appendChild(pending);
      }

      group.append(visible, hit, labelGroup);
      edgeLayer.appendChild(group);
    });
  }

  function renderMobileGraph() {
    const scenario = model.scenarios[activeScenario];
    const stepMap = new Map(scenario.steps);
    const orderedNodes = scenario.steps
      .slice()
      .sort((a, b) => a[1] - b[1])
      .map(([id]) => nodeById.get(id));

    mobileGraph.innerHTML = `
      <div class="mobile-path-head">
        <span>当前路径</span>
        <strong>${scenario.title}</strong>
      </div>
      <ol class="mobile-path-list">
        ${orderedNodes.map((node) => `
          <li>
            <button type="button" data-mobile-node="${node.id}" aria-label="查看 ${node.label}">
              <span>${stepMap.get(node.id)}</span>
              <div><strong>${node.label}</strong><small>${node.subtitle}</small></div>
            </button>
          </li>
        `).join('')}
      </ol>
      <div class="mobile-components">
        <p>其它组件</p>
        <div>${model.nodes.filter((node) => !stepMap.has(node.id)).map((node) => `<button type="button" data-mobile-node="${node.id}">${node.label}</button>`).join('')}</div>
      </div>
    `;

    mobileGraph.querySelectorAll('[data-mobile-node]').forEach((button) => {
      button.addEventListener('click', () => {
        selectNode(button.dataset.mobileNode, true);
        document.querySelector('.inspector').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function clearSelectionClasses() {
    document.querySelectorAll('.diagram-node').forEach((node) => node.classList.remove('selected', 'related', 'dimmed'));
    document.querySelectorAll('.edge-group').forEach((edge) => edge.classList.remove('selected', 'related', 'dimmed'));
  }

  function applyScenario() {
    const scenario = model.scenarios[activeScenario];
    scenarioEls.title.textContent = scenario.title;
    scenarioEls.summary.textContent = scenario.summary;
    inspector.scenarioTitle.textContent = scenario.title;
    inspector.next.textContent = scenario.next;

    document.querySelectorAll('[data-scenario]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.scenario === activeScenario));
    });

    document.querySelectorAll('.diagram-node').forEach((nodeEl) => {
      const active = scenario.nodes.includes(nodeEl.dataset.nodeId);
      nodeEl.classList.toggle('scenario-active', active);
      nodeEl.classList.remove('step-marked');
      const badge = nodeEl.querySelector('.node-step');
      badge.textContent = '';
    });

    scenario.steps.forEach(([id, step]) => {
      const nodeEl = document.querySelector(`[data-node-id="${id}"]`);
      if (nodeEl) {
        nodeEl.classList.add('step-marked');
        nodeEl.querySelector('.node-step').textContent = step;
      }
    });

    document.querySelectorAll('.edge-group').forEach((edgeEl) => {
      edgeEl.classList.toggle('scenario-active', scenario.edges.includes(edgeEl.dataset.edgeId));
    });

    document.body.dataset.scenario = activeScenario;
    renderMobileGraph();
    if (selectionFocused) restoreSelection();
    else showOverview();
  }

  function showOverview() {
    clearSelectionClasses();
    renderInspectorForNode(nodeById.get('da'));
  }

  function restoreSelection() {
    if (selected.type === 'node') selectNode(selected.id, false);
    else selectEdge(selected.id, false);
  }

  function renderInspectorForNode(node) {
    inspector.type.textContent = node.kind === 'optional' ? '按需能力' : node.kind === 'input' ? '输入' : node.kind === 'output' ? '结果接收者' : '组件';
    inspector.status.textContent = node.statusLabel;
    inspector.status.className = `status-tag ${statusClass(node.status)}`;
    inspector.title.textContent = node.label;
    inspector.summary.textContent = node.summary;
    inspector.details.innerHTML = node.details.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('');
  }

  function renderInspectorForEdge(edge) {
    inspector.type.textContent = '连接';
    inspector.status.textContent = edge.state === 'existing' ? '已有路径' : edge.state === 'partial' ? '部分已有' : '待接线';
    inspector.status.className = `status-tag ${edge.state === 'existing' ? 'existing' : edge.state === 'partial' ? 'partial' : 'pending'}`;
    inspector.title.textContent = edge.label;
    inspector.summary.textContent = `${nodeById.get(edge.from).label} → ${nodeById.get(edge.to).label}`;
    inspector.details.innerHTML = [
      ['传递内容', edge.payload],
      ['何时发生', edge.trigger],
      ['实际接收者', edge.consumer],
      ['怎样算接通', edge.success],
      ['当前缺口', edge.gap]
    ].map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('');
  }

  function selectNode(id, announce) {
    const node = nodeById.get(id);
    if (!node) return;
    selected = { type: 'node', id };
    selectionFocused = true;
    clearSelectionClasses();

    const selectedEl = document.querySelector(`[data-node-id="${id}"]`);
    selectedEl?.classList.add('selected');

    const relatedEdges = model.edges.filter((edge) => edge.from === id || edge.to === id);
    const relatedNodes = new Set();
    relatedEdges.forEach((edge) => {
      relatedNodes.add(edge.from);
      relatedNodes.add(edge.to);
      document.querySelector(`[data-edge-id="${edge.id}"]`)?.classList.add('related');
    });
    relatedNodes.forEach((nodeId) => {
      if (nodeId !== id) document.querySelector(`[data-node-id="${nodeId}"]`)?.classList.add('related');
    });

    document.querySelectorAll('.diagram-node').forEach((element) => {
      if (!element.classList.contains('selected') && !element.classList.contains('related')) element.classList.add('dimmed');
    });
    document.querySelectorAll('.edge-group').forEach((element) => {
      if (!element.classList.contains('related')) element.classList.add('dimmed');
    });

    renderInspectorForNode(node);
    if (announce) {
      live.textContent = `已选择组件：${node.label}。${node.summary}`;
      document.querySelector('.inspector')?.classList.add('attention');
      window.setTimeout(() => document.querySelector('.inspector')?.classList.remove('attention'), 350);
    }
  }

  function selectEdge(id, announce) {
    const edge = edgeById.get(id);
    if (!edge) return;
    selected = { type: 'edge', id };
    selectionFocused = true;
    clearSelectionClasses();

    document.querySelector(`[data-edge-id="${id}"]`)?.classList.add('selected');
    [edge.from, edge.to].forEach((nodeId) => document.querySelector(`[data-node-id="${nodeId}"]`)?.classList.add('related'));

    document.querySelectorAll('.diagram-node').forEach((element) => {
      if (!element.classList.contains('related')) element.classList.add('dimmed');
    });
    document.querySelectorAll('.edge-group').forEach((element) => {
      if (!element.classList.contains('selected')) element.classList.add('dimmed');
    });

    renderInspectorForEdge(edge);
    if (announce) live.textContent = `已选择连接：${edge.label}。${edge.payload}`;
  }

  document.querySelectorAll('[data-scenario]').forEach((button) => {
    button.addEventListener('click', () => {
      activeScenario = button.dataset.scenario;
      selected = { type: 'node', id: 'da' };
      selectionFocused = false;
      applyScenario();
      live.textContent = `已切换到${model.scenarios[activeScenario].title}。${model.scenarios[activeScenario].summary}`;
    });
  });

  renderNodes();
  renderEdges();
  applyScenario();
})();
