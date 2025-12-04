# BIM Engine SDK Demo

这是一个独立的演示项目，展示如何使用 BIM Engine SDK。

## 前置要求

1. 确保父项目已经构建完成：
   ```bash
   cd ..
   npm run build
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 复制 SDK 文件到 demo 目录：
   ```bash
   npm run copy-sdk
   ```
   或者手动复制：
   ```bash
   mkdir -p lib
   cp ../dist/bim-engine-sdk.umd.js lib/
   ```

## 运行

### 开发模式

```bash
npm run dev
```

服务器会在 `http://localhost:8080` 启动，并自动打开浏览器。

### 构建

```bash
npm run build
```

构建后的文件会在 `dist` 目录中。

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```
demo/
├── index.html          # 主页面
├── model/              # 3D 模型文件
│   └── gujianzhu.glb
├── lib/                # SDK 文件目录
│   └── bim-engine-sdk.umd.js
├── package.json        # 项目配置
├── vite.config.js      # Vite 配置
└── README.md           # 说明文档
```

## 使用说明

1. 点击 "初始化引擎" 按钮初始化 3D 引擎
2. 点击 "加载模型" 按钮加载 3D 模型
3. 其他功能按钮可以测试 SDK 的各种功能

## 注意事项

- 确保父项目的 `dist` 目录中有构建好的 SDK 文件
- 模型文件路径是相对于 `index.html` 的
- 使用 HTTP 服务器运行（不能直接打开 HTML 文件）以避免 CORS 问题

