export type ButtonType = 'button' | 'menu';

/**
 * 按钮配置接口（用于外部定义按钮）
 */
export interface ButtonConfig {
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
 * 操作按钮接口（内部使用，继承配置）
 */
export interface OptButton extends ButtonConfig {
    /** 内部使用的子按钮列表 */
    children?: OptButton[];
}

/**
 * 按钮组接口
 */
export interface ButtonGroup {
    /** 组 ID */
    id: string;
    /** 组内按钮列表 */
    buttons: OptButton[];
}

/**
 * 工具栏颜色配置接口
 */
export interface ToolbarColors {
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
 * OptBtnGroups 配置选项
 */
export interface OptBtnGroupsOptions extends ToolbarColors {
    /** 容器元素或 ID */
    container: HTMLElement | string;
    /** 是否显示标签 */
    showLabel?: boolean;
    /** 按钮可见性配置 Map */
    visibility?: Record<string, boolean>;
}

/**
 * 点击事件载荷
 */
export interface ClickPayload {
    /** 被点击的按钮对象 */
    button: OptButton;
    /** 触发的动作类型 */
    action: 'activate' | 'deactivate' | 'trigger';
    /** 当前激活状态 */
    isActive?: boolean;
}
