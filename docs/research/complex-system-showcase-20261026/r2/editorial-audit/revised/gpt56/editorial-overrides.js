(() => {
  const model = window.DA_MODEL;
  const nodeById = Object.fromEntries(model.nodes.map((node) => [node.id, node]));

  function setNode(id, subtitle, statusLabel, summary, details = []) {
    Object.assign(nodeById[id], { subtitle, statusLabel, summary, details });
  }

  setNode('request', '用户目标与授权', '已有', '提供目标、事实来源和授权边界。');
  setNode('codex', '实现与返修', '已有', '完成实现，也负责接回失败后的修复。', [
    ['当前缺口', 'DA 的失败能否稳定回到同一个任务，仍需实测。']
  ]);
  setNode('workflow', '能力与顺序', '已有，接线待证', '选择需要的专业能力和检查顺序。', [
    ['当前缺口', '所选能力是否被原任务真正使用，仍需端到端验证。']
  ]);
  setNode('bridge', '身份与回传', '已有，接线待证', '绑定任务和候选身份，并把失败送回合法恢复位置。', [
    ['不负责', '不选择专业标准，也不判断产品是否完成。'],
    ['当前', '底层能力已有；面向 DA 的入口和回执尚未接通。']
  ]);
  setNode('baseline', '必须保留', '已有', '本次修改不能破坏的既有行为。', [
    ['来源', '正式合同、已接受版本和变更前的确认行为。']
  ]);
  setNode('da', '核对交付证据', '拟议', '把要求、旧功能、当前版本和专业结果放在一起核对；证据不全就不能交付。', [
    ['通过时', '说明可以确认的范围，以及仍未验证的部分。'],
    ['失败时', '写清实际结果、预期结果和当前版本，再交回原 Codex。'],
    ['当前', '职责已经设计；普通入口和七仓接线尚未实施。']
  ]);
  setNode('validators', '检查真实成品', '各项目不同', '按项目标准观察真实成品，记录实际结果与预期结果。', [
    ['不负责', '不替 Delivery Assurance 决定证据是否覆盖本次交付。']
  ]);
  setNode('review', '高风险时复核', '按需', '关键判断容易受同一执行者影响时，再做独立复核。');
  setNode('consumer', '接收结论与成品', '待实测', '得到与当前版本一致的结论，而不是一个脱离成品的绿灯。');
  setNode('reasoned', '有新取舍时使用', '拟议', '遇到新的架构取舍时再使用。');
  setNode('domain', '按任务选择', '已有', '提供前端、科研写作、统计等专业能力。');
  setNode('curation', '决定什么值得出现', '设计中', '决定哪些文字、卡片和说明值得出现在成品里。', [
    ['当前', '职责已有设计，正式 Skill 尚未实现。']
  ]);
  setNode('writing', '处理保留文字', '已有', '内容确定后，整理阅读顺序并改成自然、准确的表达。', [
    ['不负责', '不替前端决定文字是否该出现。']
  ]);

  Object.assign(model.scenarios.success, {
    title: '正常交付',
    summary: '证据属于当前版本，交付结论进入最终使用路径。',
    next: '去向：用户或下游流程'
  });
  Object.assign(model.scenarios.failure, {
    title: '验收失败',
    summary: '当前版本不符合要求，失败交回原 Codex；修复后重新检查。',
    next: '去向：原 Codex'
  });
  Object.assign(model.scenarios.regression, {
    title: '旧功能回归',
    summary: '新用例通过，但旧入口失效；当前版本不能交付。',
    next: '去向：原 Codex'
  });

  const q = (selector) => document.querySelector(selector);
  q('.header-state').textContent = '设计已审 · 尚未接入生产';
  q('nav a[href="#decision"]').textContent = '设计取舍';
  q('nav a[href="#evidence"]').textContent = '下一步';
  q('.architecture-section .section-label').textContent = '目标架构';
  q('#architecture-title').textContent = '失败怎样回到原任务';
  q('.architecture-section .intro-copy').textContent = '项目验收程序检查真实成品；Delivery Assurance 只核对本次要求、旧功能和证据归属；Bridge Kit 把失败送回原 Codex。';
  q('.scope-statement').innerHTML = '<strong>当前边界</strong><br>设计已经审查；普通入口、自动返修和七仓接线尚未实测。';
  q('[data-scenario="failure"]').textContent = '验收失败';
  q('[data-scenario="regression"]').textContent = '旧功能回归';

  q('#lucerna').innerHTML = `
    <div class="section-intro">
      <div><p class="eyebrow">Lucerna 案例</p><h2 id="lucerna-title">状态判断的三条验收线</h2></div>
      <a class="text-link" href="https://github.com/YuukiAS/Lucerna/blob/79dd2875d3da33c6a6d80e5e35bea812b84c1ceb/results/01054_final_independent_release_acceptance/repair-product-001.md">历史修复记录</a>
    </div>
    <div class="case-grid">
      <article><h3>未观测保持中性</h3><p>两条路线可用、第三条仍在检查时，不能把整体误报为故障。历史定向回归已经通过，但没有据此宣称新的 Windows 成品已验收。</p></article>
      <article><h3>确认故障仍要提示</h3><p>消除误报不能靠压低所有告警。确认的次级故障仍须提示，否则只是把漏报包装成修复。</p></article>
      <article><h3>旧入口不能回归</h3><p>如果 Main 或 Backup 从可用变成不可用，即使新增状态用例通过，当前版本也不能交付。</p></article>
    </div>`;

  q('#decision').innerHTML = `
    <div class="section-intro compact-intro">
      <div><p class="eyebrow">设计取舍</p><h2 id="decision-title">为何只加一层</h2><p class="intro-copy">共享层只保存交付义务、候选身份、证据资格和失败去向；专业判断仍由各项目负责。</p></div>
    </div>
    <details class="route-notes"><summary>未采用的路线</summary>
      <p><strong>只加固项目测试：</strong>中央依赖最少，但每个项目仍要重复处理证据失效和失败回传。</p>
      <p><strong>另建编排平台：</strong>运行管理更完整，却会增加账户和持久状态，也不能提供项目标准的真值。</p>
    </details>`;

  q('#evidence').innerHTML = `
    <div class="section-intro compact-intro">
      <div><p class="eyebrow">下一步</p><h2 id="evidence-title">先做一条否决试验</h2><p class="intro-copy">用同一个 Lucerna 任务跑正确版本、确认故障、旧功能回归和缺少证据四类对照。</p></div>
    </div>
    <div class="evidence-layout editorial-evidence">
      <article class="falsification"><h3>通过条件</h3><ol>
        <li>失败能回到同一个原任务，不会重复启动。</li>
        <li>后三类错误候选都被拒绝，并保留具体差异。</li>
        <li>修复后重新检查当前版本，旧证据不沿用。</li>
      </ol><p>如果报告仍需人工搬运，或旧功能没有进入范围，就撤回公共层。</p></article>
      <details class="route-notes estimate-notes"><summary>旧方案估算</summary>
        <p>宿主探针 4–8 小时；首个完整切片 40–88 小时；全套旧方案 138–332 小时。三个范围逐级包含，不能相加。</p>
        <p>这是实施前估算，不是实际耗时、当前预算或已批准投入。</p>
      </details>
    </div>`;

  q('footer p').textContent = '交互原型 · Delivery Assurance 尚未实施';

  function renderEdgeDetails(edge) {
    const details = q('#inspector-details');
    details.innerHTML = [
      ['传递', edge.payload],
      ['接收与用途', edge.consumer],
      ...(edge.state === 'existing' ? [] : [['当前', edge.gap]])
    ].map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('');
  }

  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-edge-id]');
    if (!target) return;
    const edge = model.edges.find((item) => item.id === target.dataset.edgeId);
    if (edge) queueMicrotask(() => renderEdgeDetails(edge));
  });
})();
