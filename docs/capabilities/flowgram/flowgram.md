---
name: flowgram/flowgram
module: flowgram
description: Flowgram 固定布局流程编辑器，提供可视化节点编辑、连线、迷你地图等能力
status: 已实现
scope: 前端
source: 框架:Flowgram
import: "@flowgram.ai/fixed-layout-editor / @flowgram.ai/fixed-semi-materials / @flowgram.ai/form-materials / @flowgram.ai/minimap-plugin / @flowgram.ai/export-plugin / @flowgram.ai/panel-manager-plugin"
framework_version: "1.0.8"
---

## 解决什么问题

流程设计器需要一个可视化的节点编辑器来支持拖拽、连线、缩放、节点配置等交互。Flowgram 提供了完整的固定布局流程编辑器方案：

- `fixed-layout-editor`：核心编辑器，支持固定布局的节点排列和连线
- `fixed-semi-materials`：预置的半自动材质（节点样式、连线样式）
- `form-materials`：表单材质组件（节点属性配置面板）
- `minimap-plugin`：迷你地图插件
- `export-plugin`：导出功能插件
- `panel-manager-plugin`：面板管理插件

## 如何使用

### 1. 创建编辑器

```typescript
import { useEditorProps } from "@/components/design-editor/hooks/use-editor-props";
import { FixedLayoutEditor } from '@flowgram.ai/fixed-layout-editor';

// 配置编辑器属性和节点注册
const props = useEditorProps(initialData, nodeRegistries);
```

### 2. 节点注册

每种节点类型通过 `FlowNodeRegistry` 接口注册到编辑器，定义节点的元数据和行为。

### 3. 插件扩展

```typescript
import { MinimapPlugin } from '@flowgram.ai/minimap-plugin';
import { ExportPlugin } from '@flowgram.ai/export-plugin';
import { PanelManagerPlugin } from '@flowgram.ai/panel-manager-plugin';
```

## 使用实例

`@coding-flow/flow-design` 模块基于 Flowgram 构建了完整的流程设计器：
- 19 种节点类型的可视化编辑
- 节点属性面板配置
- 条件分支和并行分支的可视化编排
- 迷你地图导航
