import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';

export default defineConfig(({ command }) => {
  return {
    plugins: [
      // 移除 Vue 插件
      dts({
        include: ['src'],
        exclude: [
          'src/**/*.es.js', 
          'src/bim-engine-sdk.es.js',
          '**/*.es.js'
        ], // 排除第三方 SDK 文件，避免类型分析错误
        rollupTypes: true,
        logLevel: 'warn', // 只显示警告和错误
      }),
      cssInjectedByJs()
    ],
    // 开发服务器配置
    server: {
      port: 3000,
      open: '/demo/index.html', // 自动打开 demo 页面
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'LyzBimEngineSDK',
        fileName: (format) => `bim-engine-sdk.${format}.js`,
      },
      rollupOptions: {
        // 不再需要排除 Vue
        output: {
          globals: {},
        },
      },
      sourcemap: true,
      emptyOutDir: true,
    },
  };
});