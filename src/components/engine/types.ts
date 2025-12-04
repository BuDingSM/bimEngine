/**
 * 引擎配置选项
 * 用于 Engine 组件的初始化
 */
export interface EngineOptions {
    /** 容器元素 */
    container: HTMLElement;
    /** 背景颜色（十六进制数字，如 0x333333） */
    backgroundColor?: number;
    /** WebGL 版本 */
    version?: 'v1' | 'v2';
    /** 是否显示性能统计 */
    showStats?: boolean;
    /** 是否显示视图立方体 */
    showViewCube?: boolean;
}

/**
 * 模型加载选项
 * 用于配置模型的位置、旋转和缩放
 */
export interface ModelLoadOptions {
    /** 模型初始位置 [x, y, z] */
    position?: [number, number, number];
    /** 模型初始旋转 [x, y, z]（弧度） */
    rotation?: [number, number, number];
    /** 模型初始缩放 [x, y, z] */
    scale?: [number, number, number];
    /** 模型 ID（可选，如果不提供则自动生成） */
    id?: string;
}
