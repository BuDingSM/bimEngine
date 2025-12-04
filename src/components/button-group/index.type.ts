export type ButtonType = 'button' | 'menu';

/** 按钮配置 */
export interface ButtonConfig {
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

export interface OptButton extends ButtonConfig {
    children?: OptButton[];
}

export interface ButtonGroup {
    id: string;
    buttons: OptButton[];
}

export interface ButtonGroupColors {
    backgroundColor?: string;
    btnBackgroundColor?: string;
    btnHoverColor?: string;
    btnActiveColor?: string;
    iconColor?: string;
    iconActiveColor?: string;
    textColor?: string;
    textActiveColor?: string;
}

// --- 新增布局类型 ---

/** 弹窗/按钮组位置 */
export type GroupPosition = 
    | 'center' 
    | 'top-left' | 'top-center' | 'top-right' 
    | 'left-center' | 'right-center' 
    | 'bottom-left' | 'bottom-center' | 'bottom-right'
    | { x: number; y: number }
    | 'static'; // static 表示不绝对定位，随文档流

/** 按钮组排列方向 (Flex-direction) */
export type GroupDirection = 'row' | 'column';

/** 按钮内部文字图标排列 */
export type ButtonAlign = 'vertical' /* 图标在上 */ | 'horizontal' /* 图标在左 */;

/** 二级菜单展开方向 */
export type ExpandDirection = 'up' | 'down' | 'left' | 'right';

export interface ButtonGroupOptions extends ButtonGroupColors {
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

export interface ClickPayload {
    button: OptButton;
    action: 'activate' | 'deactivate' | 'trigger';
    isActive?: boolean;
}