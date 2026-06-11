---
name: antd/antd
module: antd
description: Ant Design (PC) / Ant Design Mobile (移动端) UI 组件库，提供丰富的预置组件
status: 已实现
scope: 前端
source: 框架:Ant Design
import: "antd / antd-mobile / @ant-design/icons"
framework_version: "antd ^6.2.1, antd-mobile ^5.42.3, @ant-design/icons ~6.1.0"
---

## 解决什么问题

项目需要分别支持 PC 端和移动端，两个平台有不同的 UI 规范。Ant Design 生态提供了完整的跨平台组件方案：

- **antd**（PC 端）：提供 Table、Form、Modal、Drawer、Button 等企业级组件
- **antd-mobile**（移动端）：提供适配移动端的 Popup、List、Button 等组件
- **@ant-design/icons**：统一的图标库

## 如何使用

### PC 端

```typescript
import { Button, Table, Modal, Form, Input } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

<Table columns={columns} dataSource={data} />
<Modal open={visible} onOk={handleOk}><Form>...</Form></Modal>
```

### 移动端

```typescript
import { Button, Popup, List } from 'antd-mobile';

<Popup visible={visible} position="bottom">...</Popup>
<List>...</List>
```

### 图标

```typescript
import { ApprovalIcon, ProcessIcon } from '@coding-flow/flow-icons';
// flow-icons 基于 @ant-design/icons 封装了流程相关的自定义图标
```

## 使用实例

- `@coding-flow/flow-pc-ui`：PC 端基础 UI 组件，基于 antd 二次封装
- `@coding-flow/flow-mobile-ui`：移动端基础 UI 组件，基于 antd-mobile 二次封装
- `@coding-flow/flow-pc-form` / `@coding-flow/flow-pc-approval`：直接使用 antd 的 Table、Form、Modal 等组件
- `@coding-flow/flow-design`：设计面板使用 antd 的 Drawer、Form、Tabs 等组件
