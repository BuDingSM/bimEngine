/**
 * 通用弹窗组件类
 * 支持拖拽、缩放、自定义内容和位置。
 */
declare class BimDialog {
    private element;
    private options;
    private container;
    private header;
    private contentArea;
    private _isDestroyed;
    /**
     * 构造函数
     * @param options 弹窗配置选项
     */
    constructor(options: DialogOptions);
    /**
     * 创建弹窗的 DOM 结构
     */
    private createDom;
    /**
     * 设置元素尺寸
     */
    private setSize;
    /**
     * 初始化组件功能
     */
    private init;
    /**
     * 初始化弹窗位置
     */
    private initPosition;
    /**
     * 初始化拖拽功能
     */
    private initDrag;
    /**
     * 初始化缩放功能
     */
    private initResize;
    /**
     * 动态设置内容
     * @param content 内容元素或 HTML 字符串
     */
    setContent(content: HTMLElement | string): void;
    /**
     * 关闭弹窗并销毁
     */
    close(): void;
}

/**
 * BimEngine 主类
 * 负责初始化整个应用界面，协调各个子模块（如工具栏、弹窗等）。
 */
export declare class BimEngine {
    /** 主容器元素 */
    private container;
    /** 内部包装器元素，用于承载所有 UI 组件 */
    private wrapper;
    /** 工具栏管理器实例 */
    toolbar: ToolbarManager | null;
    /** 弹窗管理器实例 */
    dialog: DialogManager | null;
    /**
     * 构造函数
     * @param container 容器元素或容器 ID
     */
    constructor(container: HTMLElement | string);
    /**
     * 初始化方法
     * 创建 DOM 结构并初始化各子模块
     */
    private init;
    /**
     * 销毁实例
     * 清理所有资源和 DOM 元素
     */
    destroy(): void;
}

/**
 * 按钮配置接口（用于外部定义按钮）
 */
declare interface ButtonConfig {
    /** 唯一标识 */
    id: string;
    /** 按钮类型：普通按钮或菜单按钮 */
    type: ButtonType;
    /** 按钮显示文字 */
    label: string;
    /** SVG 图标（内联 SVG 字符串） */
    icon?: string;
    /** 是否保持激活状态（默认 false） */
    keepActive?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 点击回调函数 */
    onClick?: (button: OptButton) => void;
    /** 子按钮配置（可选，用于菜单按钮） */
    children?: ButtonConfig[];
    /** 所属组ID */
    groupId?: string;
    /** 父按钮ID（如果是子按钮，则必填） */
    parentId?: string;
}

/**
 * 按钮组接口
 */
export declare interface ButtonGroup {
    /** 组 ID */
    id: string;
    /** 组内按钮列表 */
    buttons: OptButton[];
}

declare type ButtonType = 'button' | 'menu';

/**
 * 点击事件载荷
 */
export declare interface ClickPayload {
    /** 被点击的按钮对象 */
    button: OptButton;
    /** 触发的动作类型 */
    action: 'activate' | 'deactivate' | 'trigger';
    /** 当前激活状态 */
    isActive?: boolean;
}

/**
 * 弹窗颜色配置
 */
declare interface DialogColors {
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
 * 弹窗管理器
 * 负责创建和管理应用中的各类弹窗。
 */
declare class DialogManager {
    /** 弹窗挂载的父容器 */
    private container;
    /**
     * 构造函数
     * @param container 弹窗挂载的目标容器
     */
    constructor(container: HTMLElement);
    /**
     * 创建一个通用弹窗
     * @param options 弹窗配置选项（不需要传 container，自动使用管理器绑定的容器）
     * @returns BimDialog 实例
     */
    create(options: Omit<DialogOptions, 'container'>): BimDialog;
    /**
     * 显示二次封装的模型信息弹窗
     * 演示如何调用特定的业务弹窗组件
     */
    showInfoDialog(): void;
}

/**
 * 弹窗配置选项接口
 */
declare interface DialogOptions extends DialogColors {
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
    /** 弹窗唯一标识 ID (可选) */
    id?: string;
}

/**
 * 弹窗位置类型定义
 * 可以是预设的字符串位置（如 'center', 'top-left' 等），
 * 也可以是具体的坐标对象 { x, y }
 */
declare type DialogPosition = 'center' | 'top-left' | 'top-center' | 'top-right' | 'left-center' | 'right-center' | 'bottom-left' | 'bottom-center' | 'bottom-right' | {
    x: number;
    y: number;
};

/**
 * 底部操作按钮组组件
 * 负责渲染和管理底部工具栏的按钮、下拉菜单及相关交互。
 */
export declare class OptBtnGroups {
    /** 挂载容器 */
    private container;
    /** 组件配置选项 */
    private options;
    /** 按钮组列表，按顺序存储 */
    private groups;
    /** 当前处于激活状态的按钮 ID 集合 */
    private activeBtnIds;
    /** 按钮 DOM 元素的引用映射，方便快速查找 */
    private btnRefs;
    /** 当��显示的下拉菜单元素 */
    private dropdownElement;
    /** 鼠标悬停计时器，用于处理菜单显示的防抖 */
    private hoverTimeout;
    /** 默认图标 SVG */
    private readonly DEFAULT_ICON;
    /**
     * 构造函数
     * @param options 配置选项
     */
    constructor(options: OptBtnGroupsOptions);
    /**
     * 初始化容器
     */
    private initContainer;
    /**
     * 应用样式配置到 CSS 变量
     */
    private applyStyles;
    /**
     * 更新颜色配置
     * @param colors 颜色配置对象
     */
    setColors(colors: ToolbarColors): void;
    /**
     * 添加按钮组
     * @param groupId 组ID
     * @param beforeGroupId 在哪个组之前插入（可选���，不传则插入到最后
     */
    addGroup(groupId: string, beforeGroupId?: string): void;
    /**
     * 添加按钮到指定组
     * @param config 按钮配置（必须包含 groupId，可选包含 parentId）
     */
    addButton(config: ButtonConfig): void;
    /**
     * 递归查找按钮
     */
    private findButton;
    /**
     * 初始化组件，加载默认按钮配置
     */
    init(): Promise<void>;
    /**
     * 渲染整个工具栏
     */
    render(): void;
    /**
     * 渲染单个按钮组
     */
    private renderGroup;
    /**
     * 渲染单个按钮
     */
    private renderButton;
    /**
     * 处理按钮点击事件
     */
    private handleClick;
    /**
     * 处理子菜单项点击事件
     */
    private handleSubClick;
    /**
     * 处理鼠标移入事件（显示菜单）
     */
    private handleMouseEnter;
    /**
     * 处理鼠标移出事件（隐藏菜单）
     */
    private handleMouseLeave;
    /**
     * 显示下拉菜单
     */
    private showDropdown;
    /**
     * 渲染下拉菜单项
     */
    private renderDropdownItem;
    /**
     * 关闭所有下拉菜单
     */
    private closeDropdown;
    /**
     * 更新按钮的激活状态样式
     */
    private updateButtonState;
    /**
     * 获取图标 SVG 字符串
     */
    private getIcon;
    /**
     * 更新按钮可见性
     * @param buttonId 按钮ID
     * @param visible 是否可见
     */
    updateButtonVisibility(buttonId: string, visible: boolean): void;
    /**
     * 设置是否显示标签
     * @param show 是否显示
     */
    setShowLabel(show: boolean): void;
    /**
     * 设置背景颜色 (兼容旧接口)
     * @param color CSS 颜色值
     */
    setBackgroundColor(color: string): void;
    /**
     * 检查按钮是否可见
     */
    private isVisible;
    /**
     * 销毁组件，清理资源
     */
    destroy(): void;
}

/**
 * OptBtnGroups 配置选项
 */
export declare interface OptBtnGroupsOptions extends ToolbarColors {
    /** 容器元素或 ID */
    container: HTMLElement | string;
    /** 是否显示标签 */
    showLabel?: boolean;
    /** 按钮可见性配置 Map */
    visibility?: Record<string, boolean>;
}

/**
 * 操作按钮接口（内部使用，继承配置）
 */
export declare interface OptButton extends ButtonConfig {
    /** 内部使用的子按钮列表 */
    children?: OptButton[];
}

/**
 * 工具栏颜色配置接口
 */
declare interface ToolbarColors {
    /** 工具栏背景颜色 */
    backgroundColor?: string;
    /** 按钮默认背景颜色 */
    btnBackgroundColor?: string;
    /** 按钮 Hover 背景颜色 */
    btnHoverColor?: string;
    /** 按钮激活状态背景颜色 */
    btnActiveColor?: string;
    /** 图标默认颜色 */
    iconColor?: string;
    /** 图标激活/Hover 颜色 */
    iconActiveColor?: string;
    /** 文字默认颜色 */
    textColor?: string;
    /** 文字激活/Hover 颜色 */
    textActiveColor?: string;
}

/**
 * 工具栏管理器
 * 负责管理底部操作栏的按钮组、按钮及其可见性等状态。
 */
declare class ToolbarManager {
    /** 内部工具栏组件实例 */
    private optBtnGroups;
    /** 工具栏挂载的容器 */
    private container;
    /**
     * 构造函数
     * @param container 工具栏挂载的容器元素
     */
    constructor(container: HTMLElement);
    /**
     * 初始化工具栏
     */
    private init;
    /**
     * 添加一个工具栏按钮组
     * @param groupId 新组的 ID
     * @param beforeGroupId (可选) 插入到哪个组之前，不传则追加到最后
     */
    addGroup(groupId: string, beforeGroupId?: string): void;
    /**
     * 添加一个工具栏按钮
     * @param config 按钮配置对象
     */
    addButton(config: ButtonConfig): void;
    /**
     * 设置按钮的可见性
     * @param buttonId 按钮 ID
     * @param visible 是否可见
     */
    setButtonVisibility(buttonId: string, visible: boolean): void;
    /**
     * 设置是否显示按钮下方的文字标签
     * @param show 是否显示
     */
    setShowLabel(show: boolean): void;
    /**
     * 设置整个工具栏的可见性
     * @param visible 是否可见
     */
    setVisible(visible: boolean): void;
    /**
     * 设置工具栏背景颜色
     * @param color CSS 颜色值
     */
    setBackgroundColor(color: string): void;
    /**
     * 设置工具栏详细颜色配置
     * @param colors 颜色配置对象
     */
    setColors(colors: ToolbarColors): void;
    /**
     * 销毁工具栏管理器
     */
    destroy(): void;
}

export { }
