/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明全局 SDK 类型
declare global {
  interface Window {
    LyzBimEngineSDK: {
      BimEngine: any;
    };
  }
}

export {}

