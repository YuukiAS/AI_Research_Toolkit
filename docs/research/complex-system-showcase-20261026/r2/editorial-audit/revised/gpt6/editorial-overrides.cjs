'use strict';

// Editorial revision layer. The original R2 model remains in content.cjs;
// this file changes only reader-facing hierarchy and copy.
const model = require('./content.cjs');
const { copy, ui, nodes, edges, stories } = model;

const setUi = (key, value) => { copy[ui[key]] = value; };
const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]));

setUi('heading', '交付前，谁检查什么');
setUi('intro', '项目验收看真实成品；Delivery Assurance 核对本次要求、受影响的旧功能，以及证据是否属于当前版本。失败仍交回原 Codex 修复。');
setUi('status', '设计方案 · 尚未接入生产');
setUi('graphTitle', '交付路径');
setUi('hint', '选择组件、连线或路径');
setUi('all', '查看全图');
setUi('existing', '已有路径');
setUi('proposed', '待接线');
setUi('optional', '按需能力');
setUi('need', '职责');
setUi('input', '需要');
setUi('output', '交给');
setUi('remove', '风险');
setUi('now', '当前');
setUi('edgePayload', '传递');
setUi('edgeConsumer', '接收与用途');
setUi('edgeState', '当前');
setUi('idleTitle', '从要求到交付');
setUi('idleBody', '先选一条路径，再逐步查看证据怎样进入交付判断。');
setUi('storyNote', '');
setUi('caseTitle', 'Lucerna：未观测不等于故障');
setUi('caseP1', '两条访问路线可用、另一条仍在检查时，旧逻辑曾把整体状态显示为故障。原因是尚未观测的辅助状态被当成了已确认故障。');
setUi('caseP2', '修复必须同时守住两条线：未观测保持中性，确认故障仍然提示。历史回归已经通过，但当时没有重建并独立验收新的 Windows 成品。');
setUi('row3note', '');
setUi('evidenceTitle', '证据边界');
setUi('evidenceP', '源码解释判断为何改变；运行记录说明当次成品怎样表现。新的 DA 接线仍需从正常任务入口实测。');
setUi('e1title', '已有事实');
setUi('e1body', '历史修复已把未观测状态排除在确认故障之外，并通过定向回归。它不能证明后来修改过的 Windows 成品已经验收。');
setUi('e3title', '还没证明的关键接线');
setUi('e3body', '必须观察到原 Codex 收到具体失败、在原权限内修复，并返回绑定新版本的证据。仅生成一份失败报告不算闭环。');
setUi('choiceTitle', '先做一条真实链路');
setUi('choiceP', '用同一个 Lucerna 任务跑四类对照：正确版本、确认故障、旧功能回归和缺少证据。后三类都应拒绝交付，并把失败送回原 Codex；修复后重新验收当前版本。');
setUi('alternative', '如果共享层不能减少漏检、催验收或人工搬运报告，就撤去它，只保留项目内有效的回归检查。');
setUi('costP', '旧方案估算：宿主探针 4–8 小时，首个完整试点 40–88 小时，七仓全量 138–332 小时。三个范围逐级包含，不能相加。');
setUi('costNote', '这是实施前估算，不是已花工时或当前预算；也不含外部审查、设备、账号和新的科学训练。');
setUi('footer', '资料核对至 2026-10-26');
copy[stories.find((item) => item.id === 'normal').label] = '正常完成';
copy[stories.find((item) => item.id === 'failure').label] = '验收失败';
copy[stories.find((item) => item.id === 'regression').label] = '旧功能回归';

function setNode(id, summary, details = [], role) {
  const node = nodeById[id];
  if (role) copy[node.role] = role;
  node.summary = summary;
  node.editorialDetails = details;
}

setNode('user', '提供原始要求和授权边界。');
setNode('codex', '完成实现，也负责接回失败后的修复。', [['当前缺口', 'DA 的失败能否稳定回到同一个任务，仍需实测。']], '实现与返修');
setNode('artifact', '被检查的源码、构建或运行对象；证据必须绑定同一版本。', [['关键边界', '旧截图不能自动成为新版本的证据。']]);
setNode('validator', '按项目标准观察真实成品，记录实际结果与预期结果。', [['不负责', '不替 Delivery Assurance 决定证据是否覆盖本次交付。']], '按项目标准检查成品');
setNode('baseline', '本次修改不能破坏的既有行为。', [['来源', '正式合同、已接受版本和变更前的确认行为。']], '已接受的旧功能');
setNode('workflow', '选择所需能力和检查顺序。', [['当前缺口', '所选能力是否真的被原任务使用，仍需端到端验证。']]);
setNode('da', '把要求、旧功能、当前版本和专业结果放在一起核对；证据不全就不能交付。', [
  ['通过时', '说明可以确认的范围，以及仍未验证的部分。'],
  ['失败时', '写清实际结果、预期结果和当前版本，再交回原 Codex。'],
  ['当前', '职责已经设计；普通入口和七仓接线尚未实施。']
], '核对交付范围与证据');
setNode('review', '高风险判断按需独立复核，不是每次交付的固定关卡。', [['何时使用', '专业标准或关键产品判断容易被同一执行者影响时。']]);
setNode('bridge', '绑定任务和候选身份，并把失败送回合法恢复位置。', [
  ['不负责', '不选择专业标准，也不判断产品是否完成。'],
  ['当前', '底层能力已有；面向 DA 的入口和回执尚未接通。']
]);
setNode('delivery', '核对结论后接受成品，不替代用户或项目方的最终决定。', [['当前', '这是拟议接收点，生产入口尚未实测。']]);
setNode('reasoned', '遇到新的架构取舍时再使用。');
setNode('curation', '决定哪些文字、卡片和说明值得出现在成品里。', [['当前', '职责已有设计，正式 Skill 尚未实现。']]);
setNode('writing', '内容确定后，整理阅读顺序并改成自然、准确的表达。', [['不负责', '不替前端决定文字是否该出现。']]);
setNode('domain', '按任务选择前端、科研写作、统计等专业能力。');

for (const edge of edges) {
  edge.editorialDetails = [['传递', copy[edge.payload]], ['接收与用途', copy[edge.consumer]]];
  if (!edge.existing) edge.editorialDetails.push(['当前', copy[edge.status]]);
}

function setStep(storyId, index, title, body) {
  const story = stories.find((item) => item.id === storyId);
  copy[story.steps[index].title] = title;
  copy[story.steps[index].body] = body;
}

const common = [
  ['保留原始要求', '原 Codex 收到目标：检查中和未观测不能误报，确认故障仍要提醒。'],
  ['划定检查范围', '除状态判断外，也要覆盖原来可用的入口。缺少测试时先补测试。'],
  ['生成当前版本', '完成修改和构建，并把检查绑定到这个版本；旧截图不能沿用。']
];
for (const storyId of ['normal', 'failure', 'regression']) common.forEach(([title, body], index) => setStep(storyId, index, title, body));
setStep('normal', 3, '检查真实成品', '项目检查覆盖未观测、确认故障和旧入口；必要时再做独立复核。');
setStep('normal', 4, '接受交付', '证据完整且版本一致，才把相应范围的成品交给用户。');
setStep('failure', 3, '确认故障却显示正常', '故意错误的版本压低了真实告警，项目检查记录实际结果与预期结果。');
setStep('failure', 4, '把失败交回原任务', '失败包含版本、证据和差异，由 Bridge Kit 送回同一个 Codex 任务。');
setStep('failure', 5, '修复并重新取证', '原 Codex 修正判断、生成新版本，旧版本的通过结果随即失效。');
setStep('failure', 6, '接受交付', '新版本重新通过完整检查后，才进入交付路径。');
setStep('regression', 3, '新逻辑弄坏旧入口', '状态用例通过，但原来可用的入口失效；当前版本不能交付。');
setStep('regression', 4, '保留原要求并返修', '失败反馈同时保留新要求和旧功能边界，交回原 Codex。');
setStep('regression', 5, '重验受影响功能', '新版本重新检查状态判断和所有受影响入口；无法确认的部分明确记为缺证据。');
setStep('regression', 6, '接受交付', '新旧要求都通过，并且证据属于当前版本，才接受交付。');

module.exports = model;
