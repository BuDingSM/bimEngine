# 工具栏组件 (Toolbar)

BimEngine SDK 提供了功能强大的工具栏组件 `ToolbarManager` (底层基于 `OptBtnGroups`)，支持多级菜单、按钮分组、动态显隐和样式高度定制。

## 1. 组件作用

*   提供一个统一的底部操作栏。
*   支持按钮分组管理。
*   支持层级下拉菜单。
*   提供标准的交互反馈（Hover、Active、Disabled）。
*   支持完全的样式定制（背景色、图标色、文字色等）。

## 2. 初始化与使用

通常通过 `BimEngine` 实例访问：

```typescript
const engine = new BimEngine('container-id');
// engine.toolbar 即为 ToolbarManager 实例
```

或者单独使用（不推荐，除非只需工具栏）：

```typescript
import { ToolbarManager } from 'bim-engine-sdk';
const toolbar = new ToolbarManager(document.getElementById('toolbar-container'));
```

## 3. 配置项

`ToolbarManager` 没有直接的配置项，但它管理着底层的 `OptBtnGroups`。主要配置在于添加按钮时的 `ButtonConfig` 和样式设置。

### ButtonConfig (按钮配置)

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| `id` | `string` | 按钮唯一标识 |
| `type` | `'button' \| 'menu'` | 按钮类型 |
| `label` | `string` | 按钮显示文字 |
| `icon` | `string` | SVG 图标字符串 |
| `groupId` | `string` | 所属组 ID (必需) |
| `parentId` | `string` | 父按钮 ID (可选，用于子菜单) |
| `keepActive` | `boolean` | 是否保持激活状态 (Toggle 模式) |
| `disabled` | `boolean` | 是否禁用 |
| `onClick` | `Function` | 点击回调 |
| `children` | `ButtonConfig[]` | 子按钮数组 |

### ToolbarColors (颜色配置)

用于 `setColors` 方法。

| 属性 | 说明 | 默认值 |
| :--- | :--- | :--- |
| `backgroundColor` | 工具栏背景色 | `rgba(17, 17, 17, 0.88)` |
| `btnBackgroundColor` | 按钮默认背景 | `transparent` |
| `btnHoverColor` | 按钮 Hover 背景 | `#444` |
| `btnActiveColor` | 按钮激活背景 | `rgba(255, 255, 255, 0.15)` |
| `iconColor` | 图标默认颜色 | `#ccc` |
| `iconActiveColor` | 图标激活颜色 | `#fff` |
| `textColor` | 文字默认颜色 | `#ccc` |
| `textActiveColor` | 文字激活颜色 | `#fff` |

## 4. 使用案例

### 案例 1: 添加自定义按钮组和按钮

```typescript
// 1. 添加一个新组
engine.toolbar.addGroup('my-group');

// 2. 在该组添加按钮
engine.toolbar.addButton({
    id: 'my-btn',
    groupId: 'my-group',
    type: 'button',
    label: '自定义功能',
    icon: '<svg>...</svg>', // 填入 SVG 内容
    onClick: (btn) => {
        console.log('Clicked!', btn);
    }
});
```

### 案例 2: 添加带下拉菜单的按钮

```typescript
engine.toolbar.addButton({
    id: 'menu-btn',
    groupId: 'my-group',
    type: 'menu',
    label: '更多选项',
    children: [
        {
            id: 'sub-1',
            type: 'button',
            label: '选项 A',
            onClick: () => console.log('A')
        },
        {
            id: 'sub-2',
            type: 'button',
            label: '选项 B',
            onClick: () => console.log('B')
        }
    ]
});
```

### 案例 3: 修改工具栏样式

```typescript
engine.toolbar.setColors({
    backgroundColor: 'rgba(0, 122, 255, 0.9)', // 蓝色背景
    iconColor: '#ffffff', // 白色图标
    btnHoverColor: 'rgba(255, 255, 255, 0.2)'
});
```

### 案例 4: 控制显隐

```typescript
// 隐藏整个工具栏
engine.toolbar.setVisible(false);

// 隐藏特定按钮
engine.toolbar.setButtonVisibility('my-btn', false);

// 隐藏文字标签
engine.toolbar.setShowLabel(false);
```
