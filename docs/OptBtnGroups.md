# OptBtnGroups 组件使用文档

## 📋 组件简介

`OptBtnGroups` 是一个纯 TypeScript 实现的操作按钮组组件，使用原生 DOM API 开发，无任何框架依赖。

## 🎯 核心特性

- ✅ 纯 TypeScript + 原生 DOM API
- ✅ 多组分隔，独立背景块
- ✅ 二级下拉菜单
- ✅ 多选激活状态
- ✅ 可控的标签显示
- ✅ 按钮显隐控制
- ✅ SVG 图标支持
- ✅ 响应式横向滚动

## 🚀 快速开始

### 1. 安装/引入

```html
<!-- UMD 方式 -->
<script src="./dist/bim-engine-sdk.umd.js"></script>

<script>
  const { OptBtnGroups } = window.BimEngineSDK;
</script>
```

```typescript
// ES Module 方式
import { OptBtnGroups } from 'bim-engine-sdk';
```

### 2. 基础使用

```typescript
const optBtnGroups = new OptBtnGroups({
  container: 'btn-container', // 容器 ID 或 HTMLElement
  showLabel: true,             // 显示文字标签
  onClick: (payload) => {
    console.log('点击了按钮:', payload.button.label);
    console.log('操作类型:', payload.action);
    if (payload.isActive !== undefined) {
      console.log('激活状态:', payload.isActive);
    }
  }
});
```

### 3. 控制显隐

```typescript
new OptBtnGroups({
  container: 'btn-container',
  visibility: {
    '1-1': true,   // 显示
    '3-2-1': false // 隐藏
  },
  onClick: (payload) => console.log(payload)
});
```

## 📝 API 文档

### 构造函数参数

```typescript
interface OptBtnGroupsOptions {
  container: HTMLElement | string;   // 必需：容器
  showLabel?: boolean;                // 可选：显示标签（默认 true）
  visibility?: Record<string, boolean>; // 可选：显隐控制
  onClick?: (payload: ClickPayload) => void; // 可选：点击回调
}
```

### 点击事件载荷

```typescript
interface ClickPayload {
  button: OptButton;     // 被点击的按钮
  action: 'trigger' | 'activate' | 'deactivate'; // 操作类型
  isActive?: boolean;    // 激活状态（仅 keepActive 按钮有值）
}
```

- `trigger`: 触发型操作（无状态保持）
- `activate`: 激活按钮
- `deactivate`: 取消激活

### 方法

```typescript
// 销毁组件
optBtnGroups.destroy();
```

## 🛠️ 二次开发

### 修改内置按钮

编辑 `src/OptBtnGroups.ts` 中的 `defaultGroups`:

```typescript
private readonly defaultGroups: ButtonGroup[] = [
  {
    id: 'my-group',
    buttons: [
      {
        id: 'home',
        label: '首页',
        icon: '<svg viewBox="0 0 24 24">...</svg>',
        keepActive: true
      }
    ]
  }
];
```

### 修改样式

编辑 `src/OptBtnGroups.css`:

```css
.opt-btn {
  width: 50px;        /* 按钮宽度 */
  min-height: 50px;   /* 最小高度 */
}

.opt-btn.active {
  background-color: rgba(255, 255, 255, 0.15); /* 激活背景 */
  border-bottom: 2px solid #fff; /* 底部指示条 */
}
```

## 📦 构建

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

## 🎨 示例

查看 `demo-optbtn.html` 获取完整示例。

## 🤝 贡献

修改组件时请遵循：
1. 保持中文注释
2. 使用原生 DOM API（无框架依赖）
3. TypeScript 严格模式
4. 测试多种使用场景
