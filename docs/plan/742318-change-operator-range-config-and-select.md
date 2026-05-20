# 调整计划: 发起人/审批人设定的人员范围配置与选人

> 编码: 742318 | 日期: 2026-05-20 | 类型: 调整任务 | 来源: 用户需求

## 一、背景与目标

后端已为「发起人设定（INITIATOR_SELECT）」「审批人设定（APPROVER_SELECT）」两种操作人选择模式增加了「可选人员范围」能力：

- 节点可配置一个范围脚本（复用 `OperatorLoadStrategy.script` 字段，Groovy，返回人员 ID 列表）；脚本为空或返回空表示不限范围（可选任意人）。
- 提交动作（action）需要选人时，响应 `responseType=OPERATOR_SELECT`，`options`（`NodeOption[]`）中每个节点新增 `operators` 字段，携带候选人员范围。
- 前端将选人结果通过 `operatorSelectMap`（节点ID -> 人员ID列表）回传，后端校验是否越界。

前端需配套调整【两处】：

1. **节点配置**：选择「发起人设定/审批人设定」时，「当前操作人」区域改为「设定人员范围」，复用现有脚本配置能力配置范围脚本。
2. **选人弹窗**：弹出选人确认框时，把每个节点的可选人员展示出来（默认全选），允许用户调整后再提交。

## 二、关键决策（已与用户确认）

| 决策点 | 结论 |
|--------|------|
| 范围脚本承载字段 | 复用 `OperatorLoadStrategy.script`（与后端一致） |
| 选人弹窗控件 | 保持现有 `Input` 输入框，不改为复选框 |
| 默认全选实现 | 把范围内人员 ID 默认填充进输入框（逗号分隔），用户可调整 |
| 多人格式 | 输入框内逗号分隔；`handleFinish` 解析为 `number[]`，提交为 `{nodeId: number[]}`，后端收 `List<Long>`，不涉及逗号 |
| 无范围（可选任意人） | 输入框默认空，保持手工输入 ID 兜底 |

## 三、现状分析

### 3.1 节点配置（调整①）

`packages/flow-design/src/components/design-editor/node-components/strategy/operator-load.tsx`

- `SELECT_TYPE_OPTIONS`：脚本指定 / 发起人设定 / 审批人设定。
- 现有逻辑（约 56–101 行）：
  - `selectType !== 'SCRIPT'` → 「当前操作人」只渲染只读标签 `<span>{发起人设定/审批人设定}</span>`，**无法配置范围脚本**。
  - `selectType === 'SCRIPT'` → 「当前操作人」渲染 `GroovyScriptPreview` + 「编辑」按钮 + `OperatorLoadConfigModal`，编辑 `OperatorLoadStrategy.script` 字段。
- `OperatorLoadConfigModal`（`script-components/modal/operator-load-config-modal.tsx`）是编辑 `script` 字段的通用脚本弹窗，可直接复用。

### 3.2 选人弹窗（调整②）

`packages/flow-pc/flow-pc-approval/src/plugins/view/operator-select-view.tsx`
`packages/flow-mobile/flow-mobile-approval/src/plugins/view/operator-select-view.tsx`

- 弹窗为每个 `option` 渲染一个 `<Input placeholder="请输入操作人ID，多个用逗号分隔">`，`required`。
- `handleFinish`：把输入按逗号拆分 → `number[]` → 组装 `result[option.id] = ids` → `props.onChange(result)`。
- `NodeOption` 类型（`flow-types/src/types/flow-approval.ts:241`）当前为 `{id,name,type,display}`，**无 `operators` 字段**。
- 人员类型 `FlowOperator`（`flow-approval.ts:122`）为 `{id:number,name:string}`，与后端序列化的人员对象字段一致（已核对示例 `User` 序列化含 `id`、`name`）。

## 四、设计方案

### 4.1 调整①：节点配置「设定人员范围」

文件：`flow-design/.../strategy/operator-load.tsx`

- 移除「`selectType !== 'SCRIPT'` → 只读标签」分支，**所有模式统一渲染脚本编辑区域**（`GroovyScriptPreview` + 「编辑」按钮 + `OperatorLoadConfigModal`），均编辑 `OperatorLoadStrategy.script` 字段。
- `Form.Item` 的 `label` / `tooltip` 按 `selectType` 动态切换：
  - `SCRIPT` → label「当前操作人」，tooltip「设定流程的审批人」。
  - `INITIATOR_SELECT` / `APPROVER_SELECT` → label「设定人员范围」，tooltip「设定可选人员范围，留空表示不限范围（可选任意人）」。
- 切换到 INITIATOR/APPROVER 时 `script` 字段语义为「范围脚本」，可为空（不限范围）。`default-script.ts` 中 `SCRIPT_INITIATOR_SELECT` / `SCRIPT_APPROVER_SELECT`（返回 `[]`）可作为初始模板，并将其 `@SCRIPT_TITLE` 调整为「不限范围（可选任意人）」以便预览语义清晰（可选）。

### 4.2 调整②：选人弹窗展示可选范围、默认全选

1. **类型**（`flow-types/src/types/flow-approval.ts`）：`NodeOption` 增加可选字段
   ```ts
   operators?: FlowOperator[]; // 可选人员范围；为空/缺省表示不限范围
   ```

2. **PC 端 & 移动端弹窗**（两份 `operator-select-view.tsx`，逻辑一致，UI 库不同）：
   - 计算 Form `initialValues`：每个 `option.id` 默认值 = `option.operators?.map(o => o.id).join(',')`（默认全选）；无 `operators` 时默认空。
   - 在每个 `Form.Item` 的 `extra`（移动端用等价位置）展示候选范围提示，如「可选：张三(2)、李四(3)」，便于用户对照调整；无范围时不展示。
   - `Input` 与 `handleFinish` 解析逻辑保持不变（逗号 → `number[]` → `{nodeId:number[]}`）。
   - `required` 规则保留（每个节点至少选一人）。

## 五、影响范围

| 包 | 改动 |
|----|------|
| `flow-types` | `NodeOption` 增加 `operators?: FlowOperator[]` |
| `flow-design` | `operator-load.tsx` 调整①（label 动态化、统一脚本编辑）；`default-script.ts` 标题文案（可选） |
| `flow-pc-approval` | `operator-select-view.tsx` 调整②（默认填充 + 范围提示） |
| `flow-mobile-approval` | `operator-select-view.tsx` 调整②（同步） |

- 数据契约：仅 `NodeOption` 增量新增 `operators` 字段，向后兼容。
- 提交协议不变：`operatorSelectMap` 仍为 `{nodeId: number[]}`。

## 六、分步实施

| 步骤 | 内容 | 验证 |
|------|------|------|
| Step 1 | `flow-types` 给 `NodeOption` 加 `operators?` | `pnpm build:flow-types` |
| Step 2 | `flow-design` 调整①（operator-load.tsx + 文案） | `pnpm build:flow-design` |
| Step 3 | `flow-pc-approval` 调整②（默认填充 + 提示） | `pnpm run build:flow-pc` |
| Step 4 | `flow-mobile-approval` 调整②（同步） | `pnpm run build:flow-mobile` |
| Step 5 | 相关单测（解析/默认值组装等核心逻辑）+ `pnpm test` | 测试通过 |

## 七、测试计划

- 调整②核心逻辑可单测（`@rstest/core`）：
  - `initialValues` 由 `operators` 正确拼接为逗号分隔 ID 字符串（默认全选）。
  - 无 `operators` 时默认值为空。
  - `handleFinish` 把逗号分隔输入解析为 `{nodeId:number[]}`。
- 调整①以 UI 渲染为主，单测可选；以本地 `pnpm build` 编译验证为准。
