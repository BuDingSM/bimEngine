/**
 * 通用按钮组组件 (BimButtonGroup)
 */
export declare class BimButtonGroup implements IBimComponent {
    private container;
    private options;
    private groups;
    private activeBtnIds;
    private btnRefs;
    private dropdownElement;
    private hoverTimeout;
    private customColors;
    private unsubscribeLocale;
    private unsubscribeTheme;
    private readonly DEFAULT_ICON;
    constructor(options: ButtonGroupOptions);
    private initContainer;
    private updatePosition;
    /**
     * 应用样式到容器
     */
    private applyStyles;
    /**
     * 设置主题颜色
     * 只会应用到没有被用户自定义的颜色属性上
     */
    setTheme(theme: ThemeConfig): void;
    /**
     * 直接设置颜色（强制覆盖）
     * 设置的颜色会被标记为自定义，后续的 setTheme 不会覆盖它们
     */
    setColors(colors: ButtonGroupColors): void;
    init(): Promise<void>;
    setLocales(): void;
    addGroup(groupId: string, beforeGroupId?: string): void;
    addButton(config: ButtonConfig): void;
    private findButton;
    render(): void;
    private renderGroup;
    private renderButton;
    private handleClick;
    private handleMouseEnter;
    private handleMouseLeave;
    private showDropdown;
    private renderDropdownItem;
    private closeDropdown;
    private updateButtonState;
    private getIcon;
    updateButtonVisibility(id: string, visible: boolean): void;
    setShowLabel(show: boolean): void;
    private updateLabelsVisibility;
    private findButtonById;
    setBackgroundColor(color: string): void;
    private isVisible;
    destroy(): void;
}

/**
 * 通用弹窗组件类
 * 支持拖拽、缩放、自定义内容和位置。
 */
declare class BimDialog implements IBimComponent {
    private element;
    private options;
    private container;
    private header;
    private contentArea;
    private _isDestroyed;
    private _isInitialized;
    private unsubscribeTheme;
    private unsubscribeLocale;
    /**
     * 构造函数
     * @param options 弹窗配置选项
     */
    constructor(options: DialogOptions);
    /**
     * 设置主题
     * @param theme 全局主题配置
     */
    setTheme(theme: ThemeConfig): void;
    /**
     * 初始化组件功能 (接口实现)
     */
    init(): void;
    setLocales(): void;
    /**
     * 创建弹窗的 DOM 结构
     */
    private createDom;
    /**
     * 设置元素尺寸
     */
    private setSize;
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
    /**
     * 销毁组件 (接口实现)
     */
    destroy(): void;
}

export declare class BimEngine {
    private container;
    private wrapper;
    private topLeftGroup;
    toolbar: ToolbarManager | null;
    buttonGroup: ButtonGroupManager | null;
    dialog: DialogManager | null;
    get localeManager(): LocaleManager;
    get themeManager(): ThemeManager;
    constructor(container: HTMLElement | string, options?: {
        locale?: LocaleType;
        theme?: ThemeType;
    });
    setLocale(locale: LocaleType): void;
    getLocale(): LocaleType;
    setTheme(theme: 'dark' | 'light'): void;
    setCustomTheme(theme: ThemeConfig): void;
    private init;
    private createTopLeftGroup;
    private updateTheme;
    destroy(): void;
}

/** 按钮内部文字图标排列 */
declare type ButtonAlign = 'vertical' | 'horizontal';

/** 按钮配置 */
declare interface ButtonConfig {
    id: string;
    type: ButtonType;
    label: string;
    icon?: string;
    keepActive?: boolean;
    disabled?: boolean;
    onClick?: (button: OptButton) => void;
    children?: ButtonConfig[];
    groupId?: string;
    parentId?: string;
    /** 按钮内部图标文字排列 (默认 vertical，即图标在上) */
    align?: ButtonAlign;
    /** 图标大小 (正方形，单位 px，默认 32) */
    iconSize?: number;
    /** 按钮最小宽度 (单位 px，默认 50) */
    minWidth?: number;
}

export declare interface ButtonGroup {
    id: string;
    buttons: OptButton[];
}

declare interface ButtonGroupColors {
    backgroundColor?: string;
    btnBackgroundColor?: string;
    btnHoverColor?: string;
    btnActiveColor?: string;
    iconColor?: string;
    iconActiveColor?: string;
    textColor?: string;
    textActiveColor?: string;
}

/**
 * 通用按钮组管理器
 * 负责创建和管理除底部工具栏以外的其他按钮组。
 */
declare class ButtonGroupManager {
    private activeGroups;
    private container;
    constructor(container: HTMLElement);
    /**
     * 创建一个新的按钮组
     */
    create(options: Omit<ButtonGroupOptions, 'container'>): BimButtonGroup;
    updateTheme(theme: ThemeConfig): void;
    refresh(): void;
    destroy(): void;
}

export declare interface ButtonGroupOptions extends ButtonGroupColors {
    container: HTMLElement | string;
    /** 屏幕位置 (如 top-left) */
    position?: GroupPosition;
    /** 按钮组排列方向 (默认 row) */
    direction?: GroupDirection;
    /** 按钮内部图标文字排列 (默认 vertical) */
    align?: ButtonAlign;
    /** 菜单展开方向 */
    expand?: ExpandDirection;
    showLabel?: boolean;
    visibility?: Record<string, boolean>;
    className?: string;
}

declare type ButtonType = 'button' | 'menu';

export declare interface ClickPayload {
    button: OptButton;
    action: 'activate' | 'deactivate' | 'trigger';
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
    /** 活跃的弹窗实例列表 */
    private activeDialogs;
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
    /**
     * 响应全局主题变更
     * @param theme 全局主题配置
     */
    updateTheme(theme: ThemeConfig): void;
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
    /** 打开时的回调函数 */
    onOpen?: () => void;
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

/** 二级菜单展开方向 */
declare type ExpandDirection = 'up' | 'down' | 'left' | 'right';

/** 按钮组排列方向 (Flex-direction) */
declare type GroupDirection = 'row' | 'column';

/** 弹窗/按钮组位置 */
declare type GroupPosition = 'center' | 'top-left' | 'top-center' | 'top-right' | 'left-center' | 'right-center' | 'bottom-left' | 'bottom-center' | 'bottom-right' | {
    x: number;
    y: number;
} | 'static';

/**
 * BIM 引擎组件通用接口
 * 所有受引擎管理的 UI 组件都必须实现此接口
 */
declare interface IBimComponent {
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

declare type LocaleChangeListener = (locale: LocaleType) => void;

/**
 * 语言管理器类
 */
declare class LocaleManager {
    private currentLocale;
    private messages;
    private listeners;
    constructor();
    /**
     * 获取当前语言
     */
    getLocale(): LocaleType;
    /**
     * 切换语言
     */
    setLocale(locale: LocaleType): void;
    /**
     * 翻译核心方法
     */
    t(key: string): string;
    /**
     * 订阅变更
     */
    subscribe(listener: LocaleChangeListener): () => void;
    private notifyListeners;
}

/**
 * 语言代码类型
 */
declare type LocaleType = 'zh-CN' | 'en-US';

export declare interface OptButton extends ButtonConfig {
    children?: OptButton[];
}

declare type ThemeChangeListener = (theme: ThemeConfig) => void;

/**
 * 全局主题配置接口
 * 定义系统通用的语义化颜色
 */
declare interface ThemeConfig {
    /** 主题名称 */
    name: string;
    /** 品牌色/主色 */
    primary: string;
    /** 主色悬停/激活态 */
    primaryHover: string;
    /** 基础背景色 (应用整体背景) */
    background: string;
    /** 面板背景色 (工具栏、弹窗背景) */
    panelBackground: string;
    /** 主要文字颜色 */
    textPrimary: string;
    /** 次要文字颜色 */
    textSecondary: string;
    /** 边框/分割线颜色 */
    border: string;
    /** 图标默认颜色 */
    icon: string;
    /** 图标激活颜色 */
    iconActive: string;
    /** 交互组件背景 (如按钮默认背景) */
    componentBackground: string;
    /** 交互组件悬停背景 */
    componentHover: string;
    /** 交互组件激活背景 */
    componentActive: string;
}

/**
 * 主题管理器 (单例)
 */
declare class ThemeManager {
    private currentTheme;
    private listeners;
    constructor();
    /**
     * 获取当前主题配置
     */
    getTheme(): ThemeConfig;
    /**
     * 切换预设主题
     * @param themeName 'dark' | 'light'
     */
    setTheme(themeName: 'dark' | 'light'): void;
    /**
     * 应用自定义主题配置
     * @param theme 配置对象
     */
    setCustomTheme(theme: ThemeConfig): void;
    /**
     * 内部应用主题逻辑
     */
    private applyTheme;
    /**
     * 订阅主题变更
     */
    subscribe(listener: ThemeChangeListener): () => void;
    private notifyListeners;
}

/**
 * 主题类型定义
 */
declare type ThemeType = 'dark' | 'light' | 'custom';

/**
 * 底部工具栏 (Toolbar)
 * BimButtonGroup 的子类，专门用于加载工具栏默认按钮。
 */
export declare class Toolbar extends BimButtonGroup {
    /**
     * 重写初始化，加载默认按钮
     */
    init(): Promise<void>;
}

/**
 * 底部工具栏管理器 (ToolbarManager)
 * 仅负责管理底部工具栏实例。
 */
declare class ToolbarManager {
    private toolbar;
    private toolbarContainer;
    private container;
    constructor(container: HTMLElement);
    private init;
    updateTheme(theme: ThemeConfig): void;
    refresh(): void;
    destroy(): void;
    addGroup(groupId: string, beforeGroupId?: string): void;
    addButton(config: ButtonConfig): void;
    setButtonVisibility(id: string, v: boolean): void;
    setShowLabel(show: boolean): void;
    setVisible(visible: boolean): void;
    setBackgroundColor(color: string): void;
    setColors(colors: ButtonGroupColors): void;
}

export { }
