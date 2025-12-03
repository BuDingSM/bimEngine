# BIM Engine SDK

本项目是一个通用的 SDK 开发框架，旨在通过一次编码，同时支持 Vue 2、Vue 3、React 和纯 HTML 环境。

## 📁 目录结构

```
.
├── src/                # SDK 源代码
│   └── index.ts        # 入口文件
├── dist/               # 构建产物 (ESM + UMD)
├── examples/           # 各框架集成示例
│   ├── vue3-demo/      # Vue 3 + Vite
│   ├── react-demo/     # React + Vite
│   ├── vue2-demo/      # Vue 2.7 + Vite
│   └── html-demo/      # 原生 HTML
├── playground/         # 开发调试演练场 (Vue 3)
├── vite.config.ts      # Vite 构建配置 (Library Mode)
├── tsconfig.json       # TypeScript 配置
└── package.json        # 项目元数据与���赖
```

## 🚀 快速开始

### 1. 开发调试 (Playground)

使用内置的 Vue 3 演练场进行开发，支持热更新 (HMR)。

```bash
npm install
npm run dev
```

### 2. 构建 SDK

构建生成 `dist/` 目录，包含 `es` (ESM) 和 `umd` (UMD) 两种格式，以及 `.d.ts` 类型定义。

```bash
npm run build
```

### 3. 运行示例项目

`examples` 目录下的项目直接引用了本地 SDK。

**运行 Vue 3 Demo:**

```bash
cd examples/vue3-demo
npm install
npm run dev
```

**运行 React Demo:**

```bash
cd examples/react-demo
npm install
npm run dev
```

**运行 Vue 2 Demo:**

```bash
cd examples/vue2-demo
npm install
npm run dev
```

**运行 HTML Demo:**

直接在浏览器打开 `examples/html-demo/index.html`。

## 🛠️ 技术栈

*   **语言**: TypeScript
*   **构建工具**: Vite (Library Mode)
*   **类型生成**: vite-plugin-dts
*   **开发环境**: Vue 3 (用于 Playground)

## 📦 发布配置

`package.json` 配置了 `exports` 字段，确保不同环境自动加载正确的文件：

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/bim-engine-sdk.es.js",
    "require": "./dist/bim-engine-sdk.umd.js"
  }
}
```
