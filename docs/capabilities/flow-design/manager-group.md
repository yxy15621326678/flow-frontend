---
name: flow-design/manager-group
module: flow-design
description: 设计面板管理器组，包含表单字段管理、节点转换管理、路由节点管理和工作流策略管理
status: 已实现
scope: 前端
source: 项目自有
import: "@coding-flow/flow-design"
symbols:
  - WorkflowFormManager
  - NodeConvertorManager
  - NodeManger
  - NodeRouterManager
  - WorkflowStrategyManager
content_hash: 163bb56a62e8ec9a5227c97055139fcdee1d992377b5685f7504d069c7e4df24
---

## 解决什么问题

流程设计面板涉及表单字段操作、节点数据转换、路由节点查询和策略配置等多种业务逻辑。管理器组将这些逻辑从 Presenter 中抽离为独立的类：

- `WorkflowFormManager`：表单字段的增删改查和排序
- `NodeConvertorManager`：节点数据在 API 格式和渲染格式之间转换
- `NodeManger`：节点列表的查询和操作
- `NodeRouterManager`：路由节点类型的展示和管理
- `WorkflowStrategyManager`：工作流策略的配置管理

## 如何使用

### 1. WorkflowFormManager

```typescript
const formManager = new WorkflowFormManager(workflowForm);

// 获取表单字段
const fields = formManager.getFormFields(formCode);

// 添加子表单
const updatedForm = formManager.addSubForm({ code: 'sub1', name: '子表单1' });

// 更新字段值
const updatedForm = formManager.updateFieldValue(fieldCode, { label: '新标签' });

// 排序字段
const sortedForm = formManager.sortField(formCode, fieldCode, order);

// 删除字段/子表单
formManager.removeField(formCode, fieldCode);
formManager.removeSubForm(code);
```

### 2. NodeConvertorManager

```typescript
const convertor = new NodeConvertorManager();

// API 数据 → 渲染数据
const renderItem = convertor.toItemRender(apiNodeData);

// 渲染数据 → API 数据
const apiData = convertor.toData(renderNodes);

// 策略渲染数据转换
const strategyData = convertor.toStrategyRender(node);
```

### 3. NodeRouterManager

```typescript
const routerManager = new NodeRouterManager(workflowNodes);

// 获取所有节点列表
const nodes = routerManager.getNodes();

// 获取展示节点类型
const types = routerManager.displayNodeTypes;

// 获取返回节点列表
const backNodes = routerManager.getBackNodes();
```

### 4. WorkflowStrategyManager

```typescript
const strategyManager = new WorkflowStrategyManager();
// 管理流程级别的策略配置
```

## 使用实例

`Presenter`（flow-design/design-panel）在 save/load/create 操作中组合使用这些管理器：
- save 时通过 `NodeConvertorManager.toData()` 转换节点 + `WorkflowConvertor.toApi()` 生成 API 数据
- load 时通过 `WorkflowConvertor.toRender()` + `NodeConvertorManager.toItemRender()` 渲染节点
- 表单操作全部委托给 `WorkflowFormManager`
