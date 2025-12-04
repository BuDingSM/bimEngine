import { Engine, type EngineOptions, type ModelLoadOptions } from '../components/engine';

/**
 * 3D 引擎管理器
 * 负责连接 Engine 组件和 BimEngine，向外部暴露简化的 API
 * 采用延迟初始化模式，用户需主动调用 initialize() 方法
 */
export class EngineManager {
    /** 3D 引擎挂载的父容器 */
    private container: HTMLElement;
    /** 3D 引擎组件实例 */
    private engine: Engine | null = null;

    /**
     * 构造函数
     * @param container 3D 引擎挂载的目标容器
     */
    constructor(container: HTMLElement) {
        this.container = container;
    }

    /**
     * 初始化 3D 引擎
     * @param options 引擎配置选项（可选，如果不提供则使用默认配置）
     * @returns 是否初始化成功
     */
    public initialize(options?: Omit<EngineOptions, 'container'>): boolean {
        // 如果已经初始化，先销毁旧的实例
        if (this.engine && this.engine.isInitialized()) {
            console.warn('[EngineManager] 3D Engine already initialized. Destroying old instance...');
            this.engine.destroy();
            this.engine = null;
        }

        try {
            // 创建 Engine 组件实例
            // options 中的配置会自动复制给 createEngine 使用
            this.engine = new Engine({
                container: this.container,
                ...options, // 合并配置选项
            });

            // 调用组件的 init 方法初始化引擎
            this.engine.init();

            return this.engine.isInitialized();
        } catch (error) {
            console.error('[EngineManager] Failed to initialize 3D engine:', error);
            this.engine = null;
            return false;
        }
    }

    /**
     * 检查 3D 引擎是否已初始化
     */
    public isInitialized(): boolean {
        return this.engine !== null && this.engine.isInitialized();
    }

    /**
     * 加载 3D 模型
     * @param url 模型文件 URL
     * @param options 加载选项（位置、旋转、缩放）
     */
    public loadModel(url: string, options?: ModelLoadOptions): void {
        if (!this.engine || !this.engine.isInitialized()) {
            console.error('[EngineManager] 3D Engine not initialized. Please call initialize() first.');
            return;
        }
        this.engine.loadModel(url, options);
    }

    /**
     * 获取原始 3D 引擎实例
     * 用于直接调用第三方引擎的其他 API
     */
    public getEngine(): any {
        if (!this.engine) {
            console.warn('[EngineManager] 3D Engine not initialized.');
            return null;
        }
        return this.engine.getEngine();
    }

    /**
     * 销毁 3D 引擎实例
     */
    public destroy(): void {
        if (this.engine) {
            this.engine.destroy();
            this.engine = null;
        }
    }
}



