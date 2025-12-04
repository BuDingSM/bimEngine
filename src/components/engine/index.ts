import type { ThemeConfig } from '../../themes/types';
import { IBimComponent } from '../../types/component';
import { themeManager } from '../../services/theme';
import type { EngineOptions, ModelLoadOptions } from './types';
// 导入第三方 SDK 的 createEngine 函数
import { createEngine as createEngineSDK } from '../../bim-engine-sdk.es.js';

// 重新导出类型，方便外部引用
export type { EngineOptions, ModelLoadOptions };

/**
 * 3D 引擎组件
 * 负责创建和管理第三方 3D 引擎实例
 */
export class Engine implements IBimComponent {
    /** 第三方 3D 引擎实例 */
    private engine: any = null;
    /** 引擎挂载的容器元素 */
    private container: HTMLElement;
    /** 引擎容器 ID（用于传递给 createEngine） */
    private containerId: string;
    /** 引擎配置选项（不包含 container） */
    private options: Omit<EngineOptions, 'container'>;
    /** 是否已初始化 */
    private _isInitialized = false;
    /** 是否已销毁 */
    private _isDestroyed = false;
    /** 主题订阅取消函数 */
    private unsubscribeTheme: (() => void) | null = null;

    /**
     * 构造函数
     * @param options 3D 引擎配置选项
     */
    constructor(options: EngineOptions) {
        // 解析容器元素
        this.container = options.container;
        // 如果容器没有 id，生成一个唯一的 id
        if (!this.container.id) {
            this.containerId = `engine-container-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            this.container.id = this.containerId;
        } else {
            this.containerId = this.container.id;
        }

        // 保存配置选项（设置默认值）
        this.options = {
            backgroundColor: options.backgroundColor ?? 0x1a1a1a, // 默认深色背景
            version: options.version ?? 'v1', // 默认使用 v1 版本
            showStats: options.showStats ?? false, // 默认不显示统计
            showViewCube: options.showViewCube ?? true, // 默认显示视图立方体
        };
    }

    /**
     * 初始化组件 (接口实现)
     * 创建 div 容器并初始化引擎
     */
    public init(): void {
        if (this._isInitialized) {
            console.warn('[Engine] Engine already initialized.');
            return;
        }

        if (this._isDestroyed) {
            console.error('[Engine] Cannot initialize destroyed engine.');
            return;
        }

        try {
            // 创建引擎配置对象
            const engineConfig = {
                containerId: this.containerId,
                backgroundColor: this.options.backgroundColor,
                version: this.options.version,
                showStats: this.options.showStats,
                showViewCube: this.options.showViewCube,
            };

            // 调用引擎创建函数创建引擎实例
            // 将 options 中的配置复制给 createEngine
            this.engine = createEngineSDK(engineConfig);

            if (!this.engine) {
                throw new Error('Failed to create engine instance');
            }

            // 标记为已初始化
            this._isInitialized = true;

            // 订阅主题变化
            this.unsubscribeTheme = themeManager.subscribe((theme) => {
                this.setTheme(theme);
            });

            // 应用当前主题
            this.setTheme(themeManager.getTheme());
        } catch (error) {
            console.error('[Engine] Failed to initialize engine:', error);
            this._isInitialized = false;
            throw error;
        }
    }

    /**
     * 设置主题 (接口实现)
     * 根据主题调整 3D 引擎的视觉效果（如背景色）
     * @param theme 全局主题配置
     */
    public setTheme(theme: ThemeConfig): void {
        if (!this._isInitialized || !this.engine) {
            return;
        }

        // 根据主题调整背景色
        // dark 主题使用深色背景，light 主题使用浅色背景
        let backgroundColor: number;
        if (theme.name === 'dark') {
            backgroundColor = 0x1a1a1a; // 深色背景
        } else if (theme.name === 'light') {
            backgroundColor = 0xf5f5f5; // 浅色背景
        } else {
            // 自定义主题，尝试从主题配置中获取背景色
            // 如果主题配置中有 backgroundColor，使用它；否则使用默认值
            backgroundColor = this.options.backgroundColor ?? 0x1a1a1a;
        }

        // 如果引擎支持设置背景色，则更新
        if (this.engine && typeof this.engine.setBackgroundColor === 'function') {
            this.engine.setBackgroundColor(backgroundColor);
        } else if (this.engine && this.engine.scene) {
            // 如果引擎有 scene 对象，尝试设置背景色
            if (this.engine.scene.background) {
                this.engine.scene.background.setHex(backgroundColor);
            }
        }
    }

    /**
     * 设置语言 (接口实现)
     */
    public setLocales(): void {
        // 3D 引擎组件暂时不需要本地化
    }

    /**
     * 检查是否已初始化
     */
    public isInitialized(): boolean {
        return this._isInitialized;
    }


    /**
     * 加载 3D 模型
     * @param url 模型文件 URL
     * @param options 加载选项（位置、旋转、缩放）
     */
    public loadModel(url: string, options?: ModelLoadOptions): void {
        if (!this._isInitialized || !this.engine) {
            console.error('[Engine] Engine not initialized. Please call init() first.');
            return;
        }
        if (!url) {
            console.error('[Engine] Model URL is required.');
            return;
        }
        this.engine.loader.loadModel(url, options);
    }

    /**
     * 获取原始 3D 引擎实例
     */
    public getEngine(): any {
        return this.engine;
    }

    /**
     * 销毁组件 (接口实现)
     * 清理资源、取消订阅、销毁引擎实例
     */
    public destroy(): void {
        if (this._isDestroyed) {
            return;
        }
        // 取消主题订阅
        if (this.unsubscribeTheme) {
            this.unsubscribeTheme();
            this.unsubscribeTheme = null;
        }
        // 清理容器（可选，根据需求决定是否清空容器）
        this.container.innerHTML = '';
        // 更新状态
        this._isDestroyed = true;
        this._isInitialized = false;
    }
}


