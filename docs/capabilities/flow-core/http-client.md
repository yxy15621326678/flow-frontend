---
name: flow-core/http-client
module: flow-core
description: 基于 axios 封装的 HTTP 客户端，提供请求/响应拦截器、token 自动管理、分页查询、文件下载等能力
status: 已实现
scope: 前端
source: 项目自有
import: "@coding-flow/flow-core"
symbols:
  - HttpClient
  - MessageBox
  - Response
content_hash: c263693f4b69b45dfe5f44117f3c8736e01a4d42d10acb7bc9f8ab3a9bbb023b
---

## 解决什么问题

项目中所有 API 请求需要统一处理以下关注点：

- Token 鉴权：自动在请求头中注入 Authorization，响应中自动刷新 token
- 错误处理：统一的 token 过期、权限不足、业务错误的提示处理
- 分页查询：支持 Base64 编码的排序、过滤、匹配参数
- 文件下载：支持 GET/POST 方式的 blob 下载

`HttpClient` 将这些通用逻辑封装在拦截器中，业务代码只需关注请求 URL 和参数。

## 如何使用

### 1. 创建实例

```typescript
import { HttpClient } from "@coding-flow/flow-core";

const http = new HttpClient(
    30000,  // timeout
    { success: (msg) => message.success(msg), error: (msg) => message.error(msg) },
    '/api'  // baseUrl
);
```

### 2. 发起请求

```typescript
// GET 请求
const res: Response = await http.get('/users', { page: 1 });

// POST 请求
const res: Response = await http.post('/users', { name: 'test' });

// PUT / DELETE
await http.put('/users/1', { name: 'updated' });
await http.delete('/users/1');

// 分页查询（排序、过滤参数自动 Base64 编码）
const page = await http.page('/users', { current: 1, pageSize: 10 }, sort, filter, match);

// 文件下载
await http.download('/export/csv', 'data.csv');
await http.postDownload('/export/csv', params, 'data.csv');
```

### 3. Response 类型

```typescript
type Response = {
    success: boolean;
    errCode?: string;
    errMessage?: string;
    data?: any;
    total?: number;
}
```

## 使用实例

各业务模块的 API 层均通过 `HttpClient` 实例封装后端接口调用，如审批 API、设计面板 API 等。
