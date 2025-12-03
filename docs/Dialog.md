# 弹窗组件 (Dialog)

BimEngine SDK 提供了可拖拽、可缩放的通用弹窗组件 `DialogManager` (底层基于 `BimDialog`)，支持自定义内容和高度定制的样式。

## 1. 组件作用

*   提供浮动的交互窗口。
*   支持任意 HTML 内容挂载。
*   内置拖拽移动和拖拽缩放功能。
*   支持丰富的样式定制接口。

## 2. 初始化与使用

通过 `BimEngine` 实例访问：

```typescript
const engine = new BimEngine('container-id');
// engine.dialog 即为 DialogManager 实例
```

## 3. 配置项 (DialogOptions)

`engine.dialog.create(options)` 方法接受以下配置：

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `'Dialog'` | 弹窗标题 |
| `content` | `string \| HTMLElement` | - | 弹窗内容 |
| `width` | `number \| string` | `300` | 宽度 |
| `height` | `number \| string` | `'auto'` | 高度 |
| `position` | `DialogPosition` | `'center'` | 初始位置 (支持 'center', 'top-left' 等或坐标对象) |
| `draggable` | `boolean` | `true` | 是否可拖拽 |
| `resizable` | `boolean` | `false` | 是否可调整大小 |
| `minWidth` | `number` | `200` | 最小宽度 |
| `minHeight` | `number` | `100` | 最小高度 |
| `onClose` | `Function` | - | 关闭时的回调 |
| `backgroundColor` | `string` | `rgba(17, 17, 17, 0.95)` | 窗体背景色 |
| `headerBackgroundColor` | `string` | `#2a2a2a` | 标题栏背景色 |
| `titleColor` | `string` | `#fff` | 标题文字颜色 |
| `textColor` | `string` | `#ccc` | 内容默认文字颜色 |
| `borderColor` | `string` | `#444` | 边框颜色 |

## 4. 使用案例

### 案例 1: 创建基本弹窗

```typescript
engine.dialog.create({
    title: '欢迎',
    content: 'Hello World!',
    width: 400
});
```

### 案例 2: 创建包含复杂 DOM 的弹窗

```typescript
const div = document.createElement('div');
div.innerHTML = '<button>Click Me</button>';
div.querySelector('button').onclick = () => alert('Clicked');

engine.dialog.create({
    title: '交互组件',
    content: div,
    resizable: true
});
```

### 案例 3: 定制样式 (红色主题)

```typescript
engine.dialog.create({
    title: '警告',
    content: '这是一个红色主题的警告弹窗。',
    backgroundColor: 'rgba(100, 0, 0, 0.9)', // 深红背景
    headerBackgroundColor: '#ff0000',        // 鲜红标题栏
    titleColor: '#ffffff',
    borderColor: '#ff4444'
});
```

### 案例 4: 监听关闭事件

```typescript
const dlg = engine.dialog.create({
    title: '任务',
    content: '处理中...',
    onClose: () => {
        console.log('弹窗已关闭');
    }
});

// 手动关闭
// dlg.close();
```
