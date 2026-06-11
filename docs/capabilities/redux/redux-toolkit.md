---
name: redux/redux-toolkit
module: redux
description: Redux Toolkit 全局状态管理框架，提供 createSlice、configureStore、immer 集成等能力
status: 已实现
scope: 前端
source: 框架:Redux Toolkit
import: "@reduxjs/toolkit / react-redux"
framework_version: "@reduxjs/toolkit ^2.11.2, react-redux ^9.2.0"
---

## 解决什么问题

在审批组件中，需要管理复杂的全局状态（流程实例数据、审批状态、操作历史等），Redux Toolkit 提供：

- `createSlice`：简化 reducer 和 action 的定义
- `configureStore`：一键配置 store，内置中间件
- immer 集成：允许在 reducer 中直接修改状态（可变风格）
- `react-redux`：通过 `useSelector` / `useDispatch` 与 React 组件集成

## 如何使用

```typescript
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch, Provider } from 'react-redux';

// 定义 Slice
const approvalSlice = createSlice({
    name: 'approval',
    initialState,
    reducers: {
        updateFlow: (state, action) => {
            state.flow = action.payload;  // immer 支持直接修改
        },
    },
});

// 创建 Store
const store = configureStore({ reducer: { approval: approvalSlice.reducer } });

// 组件中使用
const MyComponent = () => {
    const flow = useSelector(state => state.approval.flow);
    const dispatch = useDispatch();
    dispatch(approvalSlice.actions.updateFlow(newFlow));
};

// Provider 注入
<Provider store={store}><App /></Provider>
```

## 使用实例

- `@coding-flow/flow-approval-presenter`：审批展示器框架使用 Redux Toolkit 管理审批状态
- `@coding-flow/flow-pc-approval` 和 `@coding-flow/flow-mobile-approval`：审批组件使用 `react-redux` 消费 store
- `@coding-flow/flow-design`：设计器中使用 Redux Toolkit 管理编辑器状态
