# Research Run State

BOOTSTRAP_TEMPLATE: YES
RESERVED_FOR_RUNNER_ID: GPT_WORK
RUNNER_ID: GPT_WORK
OUTPUT_ROOT: docs/research/software-production/15_INDEPENDENT_ARCHITECTURE_RESEARCH_GPT_WORK_R0
INPUT_BRANCH: research/software-production-decision-20261013
INPUT_SNAPSHOT_COMMIT: 60d0a1feb7ca1efc8f751774850a4ec176b9ab6f
STARTING_BRANCH_COMMIT: 4dfc002970bd248ddd1c4157907ec6a421a35932
STATUS: IN_PROGRESS
PHASE: PREFLIGHT_WRITE_VERIFICATION
COMPLETED_SOURCE_BATCHES: none
PENDING_SOURCE_BATCHES: PRO_INPUT; core infrastructure; product group A; product group B; official/mature alternatives; independent candidates; history challenge; final synthesis
LAST_STABLE_ARTIFACT: this recovery anchor
NEXT_ACTION: read current-branch PRO_INPUT/START_HERE.md as the live runner contract; treat this matching prebuilt RUN_STATE/SOURCE_LOG pair as authorized bootstrap; read only the four frozen PRO_INPUT files at INPUT_SNAPSHOT_COMMIT; set STATUS=IN_PROGRESS and PHASE=INPUT_READING before deep research

## 范围与恢复
旧的 GPT6_R0 目标已按用户最新指令废弃。本轮唯一写入范围为上述 OUTPUT_ROOT，现有目录身份已核对为 GPT_WORK。未读取或修改另外两个研究者输出。所有非研究目录只读；不运行生产、高成本、执行器、Slurm 或常驻服务，不创建子任务。
中断后先读本目录 RUN_STATE、SOURCE_LOG 和已提交阶段产物，按 NEXT_ACTION 继续。不得整轮重启。
