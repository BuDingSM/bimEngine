export type ButtonType = 'button' | 'menu';

/**
 * 按钮配置接口（用于外部定义按钮）
 */
export interface ButtonConfig {
    id: string;              // 唯一标识
    type: ButtonType;        // 按钮类型
    label: string;           // 按钮文字
    icon?: string;           // SVG 图标（内联 SVG 字符串）
    keepActive?: boolean;    // 是否保持激活状态（默认 false）
    disabled?: boolean;      // 是否禁用
    onClick?: (button: OptButton) => void; // 点击回调
    children?: ButtonConfig[]; // 子按钮配置（可选，用于菜单按钮）
    
    groupId?: string; // 所属组ID
    parentId?: string; // 父按钮ID（如果是子按钮）
}

/**
 * 操作按钮接口（内部使用，继承配置）
 */
export interface OptButton extends ButtonConfig {
    children?: OptButton[];  // 内部使用的子按钮列表
}

/**
 * 按钮组接口
 */
export interface ButtonGroup {
    id: string;
    buttons: OptButton[];
}

/**
 * OptBtnGroups 配置选项
 */
export interface OptBtnGroupsOptions {
    container: HTMLElement | string;
    showLabel?: boolean;
    visibility?: Record<string, boolean>;
}

/**
 * 点击事件载荷
 */
export interface ClickPayload {
    button: OptButton;
    action: 'activate' | 'deactivate' | 'trigger';
    isActive?: boolean;
}
