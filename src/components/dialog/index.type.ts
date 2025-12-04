/**
 * 弹窗位置类型定义
 * 可以是预设的字符串位置（如 'center', 'top-left' 等），
 * 也可以是具体的坐标对象 { x, y }
 */
export type DialogPosition =
    | 'center'
    | 'top-left' | 'top-center' | 'top-right'
    | 'left-center' | 'right-center'
    | 'bottom-left' | 'bottom-center' | 'bottom-right'
    | { x: number; y: number };

/**
 * 弹窗颜色配置
 */
export interface DialogColors {
    /** 窗体背景颜色，默认 rgba(17, 17, 17, 0.95) */
    backgroundColor?: string;
    /** 标题栏背景颜色，默认 #2a2a2a */
    headerBackgroundColor?: string;
    /** 标题文字颜色，默认 #fff */
    titleColor?: string;
    /** 内容文字颜色，默认 #ccc */
    textColor?: string;
    /** 边框颜色，默认 #444 */
    borderColor?: string;
}

/**
 * 弹窗配置选项接口
 */
export interface DialogOptions extends DialogColors {
    /** 弹窗挂载的父容器 */
    container: HTMLElement;
    /** 弹窗标题 */
    title?: string;
    /** 弹窗内容，支持 HTML 字符串或 HTMLElement */
    content?: HTMLElement | string;
    /** 弹窗宽度，数字（像素）或字符串（如 '50%'） */
    width?: number | string;
    /** 弹窗高度 */
    height?: number | string;
    /** 弹窗位置 */
    position?: DialogPosition;
    /** 是否可拖拽 */
    draggable?: boolean;
    /** 是否可调整大小 */
    resizable?: boolean;
    /** 最小宽度限制 */
    minWidth?: number;
    /** 最小高度限制 */
    minHeight?: number;
    /** 关闭时的回调函数 */
    onClose?: () => void;
    /** 打开时的回调函数 */
    onOpen?: () => void;
    /** 弹窗唯一标识 ID (可选) */
    id?: string;
}
