---
name: script-engine/script-engine
module: script-engine
description: 外部脚本引擎，提供 Groovy 脚本转换处理能力
status: 已实现
scope: 前端
source: 框架:Script Engine
import: "@coding-script/script-engine"
framework_version: "^0.0.9"
---

## 解决什么问题

流程引擎中大量使用 Groovy 脚本定义节点策略、条件判断和操作人逻辑。`@coding-script/script-engine` 提供 Groovy 脚本的转换和处理能力：

- `GroovyScriptConvertorUtil`：脚本转换工具（标记管理、元数据提取、return 表达式解析等）

注：flow-core 中也内置了 `GroovyFormatter` 和 `GroovyScriptConvertorUtil`，两者功能互补。

## 如何使用

```typescript
import { GroovyScriptConvertorUtil } from "@coding-script/script-engine";

// 判断是否为自定义脚本
const isCustom = GroovyScriptConvertorUtil.isCustomScript(script);

// 格式化脚本
const formatted = GroovyScriptConvertorUtil.formatScript(script);

// 提取 return 表达式
const expr = GroovyScriptConvertorUtil.getReturnScript(script);
```

## 使用实例

- `@coding-flow/flow-design`：脚本编辑器组件和动作自定义视图中使用脚本引擎处理 Groovy 脚本
- 设计面板的条件配置、节点策略脚本编辑均依赖此能力
