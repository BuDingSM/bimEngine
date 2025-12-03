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
        rollupTypes: true
      }),
      cssInjectedByJs()
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'BimEngineSDK',
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