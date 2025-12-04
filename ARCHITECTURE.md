# Engine3DManager 架构设计说明

## 🎯 设计目标

将第三方 3D 引擎封装为管理器组件，并通过**依赖注入**实现解耦。

## 🏗️ 架构模式

### 依赖注入 (Dependency Injection)

`Engine3DManager` 不直接依赖具体的 `createEngine` 实现，而是通过参数接收引擎创建函数。

```typescript
// Engine3DManager 定义工厂函数类型
export type Engine3DFactory = (config: {
    containerId: string;
    backgroundColor?: number;
    version?: 'v1' | 'v2';
    showStats?: boolean;
    showViewCube?: boolean;
}) => any;

// initialize 方法接受外部传入的创建函数
public initialize(createEngine: Engine3DFactory, options?: Engine3DOptions): boolean {
    this.engine = createEngine({ /* config */ });
}
```

### 职责分离

```
┌─────────────────────────────────────────────┐
│            BimEngine (总控制器)              │
│  - 导入 createEngine                        │
│  - 组合各个 Manager                         │
│  - 提供简洁的 API                           │
└──────────────┬──────────────────────────────┘
               │ 传入 createEngine
               ▼
┌─────────────────────────────────────────────┐
│       Engine3DManager (3D引擎管理器)        │
│  - ❌ 不导入 createEngine                  │
│  - ✅ 接受外部传入的创建函数                │
│  - 管理引擎生命周期                         │
│  - 提供统一接口                             │
└──────────────┬──────────────────────────────┘
               │ 调用
               ▼
┌─────────────────────────────────────────────┐
│      createEngine (第三方3D引擎)            │
│  - bim-engine-sdk.es.js                    │
│  - 被完全封装                               │
└─────────────────────────────────────────────┘
```

## 💡 优势

### 1. **解耦 (Decoupling)**
- `Engine3DManager` 不依赖具体的 3D 引擎实现
- 可以轻松切换不同的 3D 引擎，只需更改 `BimEngine` 中的导入

### 2. **可测试性 (Testability)**
```typescript
// 测试时可以注入 mock 引擎
const mockCreateEngine = (config) => ({
    loader: { loadModel: jest.fn() }
});

manager.initialize(mockCreateEngine, options);
```

### 3. **灵活性 (Flexibility)**
```typescript
// 可以在运行时决定使用哪个引擎
import { createEngineV1 } from './engine-v1';
import { createEngineV2 } from './engine-v2';

const engineFactory = useV2 ? createEngineV2 : createEngineV1;
manager.initialize(engineFactory, options);
```

### 4. **单一职责 (Single Responsibility)**
- **BimEngine**: 负责集成和协调
- **Engine3DManager**: 负责管理 3D 引擎的生命周期
- **createEngine**: 负责创建引擎实例

## 📊 调用流程

```typescript
// 1. 用户创建 BimEngine
const engine = new BimEngine('container');

// 2. 用户调用 initEngine3D
engine.initEngine3D({ backgroundColor: 0x333333 });

// 3. BimEngine 内部执行
//    ↓
//    导入 createEngine
//    ↓
//    调用 engine3D.initialize(createEngine, options)
//    ↓
//    Engine3DManager 使用传入的 createEngine 创建引擎实例
```

## 🔄 与其他 Manager 的对比

### DialogManager / ToolbarManager
```typescript
// 自包含，不依赖外部函数
constructor(container: HTMLElement) {
    this.init(); // 直接初始化
}
```

### Engine3DManager
```typescript
// 依赖注入，接受外部函数
constructor(container: HTMLElement) {
    this.createContainer(); // 只创建容器
}

initialize(createEngine: Engine3DFactory, options) {
    this.engine = createEngine(config); // 使用注入的函数
}
```

## 🎓 设计模式

采用的设计模式：
1. **工厂模式 (Factory Pattern)** - `Engine3DFactory` 类型
2. **依赖注入 (Dependency Injection)** - `createEngine` 通过参数传入
3. **延迟初始化 (Lazy Initialization)** - 构造时不创建引擎

## 🚀 未来扩展

### 支持多引擎
```typescript
engine.initEngine3D(createThreeJSEngine, options);
// 或
engine.initEngine3D(createBabylonEngine, options);
```

### 条件加载
```typescript
// 根据设备性能选择引擎
const factory = isHighPerformance 
    ? createAdvancedEngine 
    : createLightweightEngine;
    
engine.initEngine3D(factory, options);
```

## 📝 总结

通过依赖注入模式，`Engine3DManager` 实现了：
- ✅ 与具体 3D 引擎解耦
- ✅ 易于测试和维护
- ✅ 支持灵活切换引擎
- ✅ 保持职责单一清晰
