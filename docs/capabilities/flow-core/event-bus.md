---
name: flow-core/event-bus
module: flow-core
description: 全局事件总线（单例模式），提供 on/emit/off 发布订阅通信能力
status: 已实现
scope: 前端
source: 项目自有
import: "@coding-flow/flow-core"
symbols:
  - EventBus
content_hash: 8396d91c18e97470e81850fb32f5ce09a98976618f6484e46a521ac37d3dc4a9
---

## 解决什么问题

在 monorepo 多模块架构中，不同模块之间需要进行松耦合的事件通信（如设计器通知审批组件刷新、跨组件状态同步等）。`EventBus` 提供了基于发布-订阅模式的全局事件通信：

- 模块间无需直接引用即可通信
- 支持一对多的事件广播
- 支持按事件名取消订阅

## 如何使用

### 1. 监听事件

```typescript
import { EventBus } from "@coding-flow/flow-core";

const bus = EventBus.getInstance();

const handler = (data: any) => {
    console.log('received:', data);
};
bus.on('workflow:saved', handler);
```

### 2. 触发事件

```typescript
const bus = EventBus.getInstance();
bus.emit('workflow:saved', { id: '123', name: '审批流程' });
```

### 3. 取消监听

```typescript
// 取消指定回调
bus.off('workflow:saved', handler);

// 取消该事件的所有监听
bus.off('workflow:saved');
```

## 使用实例

项目中用于流程设计器与审批组件之间的松耦合通信，如节点变更通知、表单状态同步等场景。
