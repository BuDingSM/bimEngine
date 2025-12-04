import { BimEngine } from './bim-engine';

// 导出通用组件
export { BimButtonGroup } from './components/button-group';
export { Toolbar } from './components/button-group/toolbar';

// 导出相关类型定义
export type { OptButton, ButtonGroup, ButtonGroupOptions, ClickPayload } from './components/button-group/index.type';

// 导出主引擎类
export { BimEngine };

// 导出 3D 引擎相关类型
export type { EngineOptions, ModelLoadOptions } from './components/engine';

// 导出 createEngine 函数（从第三方 SDK 重新导出）
// 注意：createEngine 的实际实现来自 bim-engine-sdk.es.js
// 
// 使用方式：
// 1. 直接从 SDK 文件导入（推荐，如 Vue 示例）：
//    import { createEngine } from '/engine/bim-engine-sdk.es.js';
// 
// 2. 从主入口导入（如果构建配置支持）：
//    import { createEngine } from 'bim-engine-sdk';
//
// 示例：
// ```javascript
// const engine = createEngine({
//   containerId: 'vue2-container',
//   backgroundColor: 0x333333,
//   version: 'v1',
//   showStats: true,
//   showViewCube: true
// });
// 
// engine.loader.loadModel(url, { 
//   position: [10, -5, 0], 
//   rotation: [0, 0, 0], 
//   scale: [1, 1, 1] 
// });
// ```

// 重新导出 createEngine（从 SDK 文件）
// 注意：如果直接导入失败，用户应该直接从 bim-engine-sdk.es.js 文件导入
export { createEngine } from './bim-engine-sdk.es.js';