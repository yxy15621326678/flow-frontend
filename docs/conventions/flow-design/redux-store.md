---
name: flow-design/redux-store
module: flow-design
description: Redux Store 规范 — 统一使用 createSlice + configureStore + immer.original 的标准模板创建 Redux Store
status: 已实现
scope: 前端
source: 项目自有
import: "@reduxjs/toolkit / react-redux / immer"
symbols:
  - createSlice
  - configureStore
  - PayloadAction
  - original
content_hash: 4d3c8f2e1b7a9d6f5e0c3a8b2d7f4e1c9a6b3d0e8f5c2a7d4b1e6f3c0a9d8b5e
---

## 解决什么问题

不遵守此规范会导致：

- Store 创建方式不一致，增加维护成本
- 状态更新模式混乱（直接修改 vs 函数式更新混用）
- 缺少 immer 不可变状态的安全访问（直接读 Proxy 对象导致意外行为）
- Store 类型定义缺失，丧失类型安全

## 如何使用

每个需要 Redux Store 的模块/组件必须遵循以下标准模板：

### 1. 定义 StoreAction 类型

```typescript
export type XxxStoreAction = {
    updateState: (
        state: XxxState,
        action: PayloadAction<Partial<XxxState> | ((prev: XxxState) => Partial<XxxState>)>
    ) => void;
}
```

### 2. 创建 Slice

使用 `createSlice<State, Actions, "name", {}>` 泛型签名，reducer 中通过 `immer.original()` 获取原始状态：

```typescript
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { original } from 'immer';

export const xxxSlice = createSlice<XxxState, XxxStoreAction, "xxx", {}>({
    name: 'xxx',
    initialState: { ...initStateData },
    reducers: {
        updateState: (state, action) => {
            if (typeof action.payload === 'function') {
                const currentState = original(state) as XxxState;
                Object.assign(state, action.payload(currentState));
            } else {
                Object.assign(state, action.payload);
            }
        },
    },
});
```

### 3. 导出 Action、Store 和类型

```typescript
export const { updateState } = xxxSlice.actions;

export const xxxStore = configureStore({
    reducer: {
        xxx: xxxSlice.reducer,
    },
});

export type XxxReduxState = ReturnType<typeof xxxStore.getState>;
```

### 关键规则

| 规则 | 说明 |
|------|------|
| 唯一 reducer | 每个 Slice 只暴露一个 `updateState` reducer，统一状态更新入口 |
| immer.original | 在函数式更新中必须使用 `original(state)` 获取不可变原始状态，避免操作 Proxy 对象 |
| Object.assign | 使用 `Object.assign(state, ...)` 合并状态，而非直接 `return` |
| 双模式 payload | 支持 `Partial<State>` 直接合并 和 `(prev) => Partial<State>` 函数式更新 |
| 独立 Store | 每个模块创建独立的 `configureStore`，不共享全局 Store |

## 使用实例

### ✅ 正确示例

```typescript
// flow-design/src/components/design-panel/store.tsx
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { original } from 'immer';
import { initStateData, State } from "./types";

export type DesignStoreAction = {
    updateState: (
        state: State,
        action: PayloadAction<Partial<State> | ((prev: State) => Partial<State>)>
    ) => void;
}

export const designSlice = createSlice<State, DesignStoreAction, "design", {}>({
    name: 'design',
    initialState: { ...initStateData },
    reducers: {
        updateState: (state, action) => {
            if (typeof action.payload === 'function') {
                const currentState = original(state) as State;
                Object.assign(state, action.payload(currentState));
            } else {
                Object.assign(state, action.payload);
            }
        },
    },
});

export const { updateState } = designSlice.actions;
export const designStore = configureStore({
    reducer: { design: designSlice.reducer },
});
export type DesignReduxState = ReturnType<typeof designStore.getState>;
```

### ❌ 错误示例

```typescript
// 错误：多个 reducer，不符合规范
const slice = createSlice({
    reducers: {
        setFlow: (state, action) => { state.flow = action.payload; },
        setReview: (state, action) => { state.review = action.payload; },
    },
});

// 错误：未使用 immer.original，直接操作 Proxy
updateState: (state, action) => {
    const prev = state;  // Proxy 对象，不安全
    Object.assign(state, action.payload(prev));
},
```

### 已应用此规范的模块

| 文件 | Slice 名称 |
|------|-----------|
| `flow-approval-presenter/src/store/index.tsx` | `approval` |
| `flow-design/src/components/design-panel/store.tsx` | `design` |
| `flow-design/src/script-components/components/condition/store.tsx` | `condition` |
| `flow-design/src/script-components/components/form-data/store.tsx` | `formData` |
