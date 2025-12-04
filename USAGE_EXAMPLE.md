# BimEngine 使用示例

## 基础使用

### 1. 创建 BimEngine 实例

```typescript
import { BimEngine } from './src/bim-engine';

// 方式 1: 使用 DOM 元素 ID
const engine = new BimEngine('my-container', {
    locale: 'zh-CN',
    theme: 'dark'
});

// 方式 2: 使用 DOM 元素引用
const containerEl = document.getElementById('my-container');
const engine2 = new BimEngine(containerEl, {
    locale: 'en-US',
    theme: 'light'
});
```

### 2. 初始化 3D 引擎（延迟初始化）

**重要**: 3D 引擎采用延迟初始化模式，需要用户主动调用 `initEngine3D()` 方法。

```typescript
// 先创建 BimEngine 实例
const engine = new BimEngine('my-container');

// 稍后在需要时初始化 3D 引擎
const success = engine.initEngine3D({
    backgroundColor: 0x333333,
    version: 'v1',
    showStats: true,
    showViewCube: true
});

if (success) {
    console.log('3D 引擎初始化成功！');
}

// 检查引擎是否已初始化
if (engine.isEngine3DInitialized()) {
    // 可以加载模型了
}
```

### 3. 加载 3D 模型

```typescript
// 确保先初始化 3D 引擎
engine.initEngine3D({
    backgroundColor: 0x1a1a1a,
    showStats: true
});

// 加载模型 - 使用默认参数
engine.loadModel('/model/building.glb');

// 加载模型 - 自定义位置、旋转、缩放
engine.loadModel('/model/gujianzhu.glb', {
    position: [10, -5, 0],
    rotation: [0, Math.PI / 4, 0],
    scale: [2, 2, 2]
});
```

### 3. 动态切换主题和语言

```typescript
// 切换主题
engine.setTheme('dark');
engine.setTheme('light');

// 切换语言
engine.setLocale('zh-CN');
engine.setLocale('en-US');

// 设置自定义主题
engine.setCustomTheme({
    background: '#1a1a1a',
    textPrimary: '#ffffff',
    textSecondary: '#999999',
    // ... 其他主题配置
});
```

### 4. 访问 3D 引擎实例

```typescript
// 直接访问底层 3D 引擎
if (engine.engine3D) {
    // 调用第三方 3D 引擎的其他方法
    engine.engine3D.someOtherMethod();
}
```

## 在 HTML 中使用

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        #bim-container {
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <div id="bim-container"></div>
    
    <script type="module">
        import { BimEngine } from './dist/bim-engine-sdk.es.js';
        
        const engine = new BimEngine('bim-container', {
            engine3D: {
                backgroundColor: 0x1a1a1a,
                showStats: true,
                showViewCube: true
            }
        });
        
        // 加载模型
        engine.loadModel('/models/building.glb', {
            position: [0, 0, 0],
            scale: [1.5, 1.5, 1.5]
        });
    </script>
</body>
</html>
```

## 在 Vue 3 中使用

```vue
<template>
  <div ref="containerRef" class="bim-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { BimEngine } from 'bim-engine-sdk';

const containerRef = ref<HTMLElement>();
let engine: BimEngine | null = null;

onMounted(() => {
  if (containerRef.value) {
    engine = new BimEngine(containerRef.value, {
      locale: 'zh-CN',
      theme: 'dark',
      engine3D: {
        backgroundColor: 0x202020,
        showStats: true,
        showViewCube: true
      }
    });
    
    // 加载模型
    engine.loadModel('/models/building.glb');
  }
});

onUnmounted(() => {
  engine?.destroy();
});
</script>

<style scoped>
.bim-container {
  width: 100%;
  height: 100vh;
}
</style>
```

## 配置选项说明

### Engine3DOptions

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `backgroundColor` | `number` | `0x333333` | 3D 场景背景色（十六进制颜色值） |
| `version` | `'v1' \| 'v2'` | `'v1'` | WebGL 版本 |
| `showStats` | `boolean` | `false` | 是否显示性能统计 |
| `showViewCube` | `boolean` | `true` | 是否显示视图立方体 |

### LoadModel Options

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `position` | `[number, number, number]` | `[0, 0, 0]` | 模型位置 [x, y, z] |
| `rotation` | `[number, number, number]` | `[0, 0, 0]` | 模型旋转（弧度）[x, y, z] |
| `scale` | `[number, number, number]` | `[1, 1, 1]` | 模型缩放 [x, y, z] |

## 注意事项

1. **容器尺寸**: 确保容器元素有明确的宽高，否则 3D 引擎无法正常渲染
2. **模型路径**: 模型文件路径需要是可访问的 URL 或相对路径
3. **销毁实例**: 组件卸载时记得调用 `engine.destroy()` 释放资源
4. **z-index 层级**: UI 组件会自动叠加在 3D 场景之上（z-index: 100+）
