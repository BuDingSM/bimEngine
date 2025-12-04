import { ThemeConfig } from '../themes/types';

/**
 * BIM 引擎组件通用接口
 * 所有受引擎管理的 UI 组件都必须实现此接口
 */
export interface IBimComponent {
    /**
     * 初始化组件
     * 用于创建 DOM、绑定事件、加载资源等
     * 支持同步或异步操作
     */
    init(): void | Promise<void>;

    /**
     * 设置主题
     * 组件应在此方法中将 ThemeConfig 映射为自身的 CSS 变量或样式
     */
    setTheme(theme: ThemeConfig): void;


    /**
     * 设置语言
     */
    setLocales(): void;

    /**
     * 销毁组件
     * 清理 DOM 事件监听、定时器和引用
     */
    destroy(): void;
}