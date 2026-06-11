---
name: react/react
module: react
description: React UI 框架，提供组件化渲染、Hooks 响应式状态管理、虚拟 DOM 等核心能力
status: 已实现
scope: 前端
source: 框架:React
import: "react"
framework_version: "^18.3.1"
---

## 解决什么问题

作为项目的核心 UI 框架，React 提供：

- 组件化架构：将 UI 拆分为独立可复用的组件
- 声明式渲染：通过 JSX 描述 UI 状态与视图的映射
- Hooks 机制：useState、useEffect、useRef、useContext 等实现函数式组件的状态和副作用管理
- 虚拟 DOM：高效的 DOM diff 和批量更新

## 如何使用

项目基于 React 18 构建，主要使用模式：

```typescript
import React, { useState, useEffect, useRef, useContext } from 'react';

// 函数式组件 + Hooks
const MyComponent = ({ data }: Props) => {
    const [state, setState] = useState(initialState);
    useEffect(() => { /* side effect */ }, [deps]);
    return <div>{/* JSX */}</div>;
};

// Context 用于跨组件状态共享
const MyContext = React.createContext<MyType | undefined>(undefined);
```

项目中的 Presenter 模式通过 `PresenterHooks.create()` 桥接了 React 的 useState，实现了类式 Presenter 与函数式组件的集成。

## 使用实例

项目所有 UI 组件均基于 React 18 构建，包括：
- `@coding-flow/flow-design`：流程设计器组件
- `@coding-flow/flow-pc-approval`：PC 端审批组件
- `@coding-flow/flow-mobile-approval`：移动端审批组件
