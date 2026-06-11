---
name: form-engine/form-engine
module: form-engine
description: 外部表单引擎，提供表单渲染、表单项注册、表单实例创建等能力
status: 已实现
scope: 前端
source: 框架:Form Engine
import: "@coding-form/form-engine"
framework_version: "^0.0.18"
---

## 解决什么问题

流程引擎的表单配置需要动态渲染能力：根据后端定义的表单元数据（字段类型、校验规则、布局）动态生成表单 UI。`@coding-form/form-engine` 提供：

- `FormView`：表单渲染组件
- `createFormInstance`：创建表单实例（用于编程式操作）
- `registerFormItems`：注册自定义表单项组件
- `FormItemProps`：表单项属性类型定义

## 如何使用

### 1. 渲染表单

```typescript
import { FormView } from "@coding-form/form-engine";

<FormView form={formMeta} data={formData} onChange={handleChange} />
```

### 2. 创建表单实例

```typescript
import { createFormInstance } from "@coding-form/form-engine";

const formInstance = createFormInstance(formMeta);
// 编程式操作表单
```

### 3. 注册自定义表单项

```typescript
import { registerFormItems } from "@coding-form/form-engine";

// 在应用启动时注册自定义表单项
registerFormItems({
    'string': StringFormItem,
    'integer': IntegerFormItem,
    'date': DateFormItem,
    'boolean': BooleanFormItem,
});
```

### 4. 定义自定义表单项

```typescript
import type { FormItemProps } from "@coding-form/form-engine";

const MyFormItem = ({ field, value, onChange }: FormItemProps) => {
    return <input value={value} onChange={e => onChange(e.target.value)} />;
};
```

## 使用实例

- `@coding-flow/flow-pc-form`：PC 端表单渲染和表单列表
- `@coding-flow/flow-mobile-form`：移动端表单渲染
- `@coding-flow/flow-pc-approval` / `@coding-flow/flow-mobile-approval`：审批表单展示
- `apps/app-pc` / `apps/app-mobile`：应用层注册自定义表单项（string、integer、long、double、date、boolean）
