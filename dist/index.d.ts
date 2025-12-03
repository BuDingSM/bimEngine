export declare class BimEngine {
    private container;
    private optBtnGroups;
    constructor(container: HTMLElement | string);
    private init;
    private initOptBtnGroups;
    destroy(): void;
}

/**
 * 按钮配置接口（用于外部定义按钮）
 */
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
}

/**
 * 按钮组接口
 */
export declare interface ButtonGroup {
    id: string;
    buttons: OptButton[];
}

declare type ButtonType = 'button' | 'menu';

/**
 * 点击事件载荷
 */
export declare interface ClickPayload {
    button: OptButton;
    action: 'activate' | 'deactivate' | 'trigger';
    isActive?: boolean;
}

export declare class OptBtnGroups {
    private container;
    private options;
    private groups;
    private activeBtnIds;
    private btnRefs;
    private dropdownElement;
    private hoverTimeout;
    private readonly DEFAULT_ICON;
    constructor(options: OptBtnGroupsOptions);
    private initContainer;
    /**
     * 添加按钮组
     * @param groupId 组ID
     * @param beforeGroupId 在哪个组之前插入（可选），不传则插入到最后
     */
    addGroup(groupId: string, beforeGroupId?: string): void;
    /**
     * 添加按钮
     * @param config 按钮配置（必须包含 groupId，可选包含 parentId）
     */
    addButton(config: ButtonConfig): void;
    private findButton;
    init(): Promise<void>;
    render(): void;
    private renderGroup;
    private renderButton;
    private handleClick;
    private handleSubClick;
    private handleMouseEnter;
    private handleMouseLeave;
    private showDropdown;
    private renderDropdownItem;
    private closeDropdown;
    private updateButtonState;
    private getIcon;
    private isVisible;
    destroy(): void;
}

/**
 * OptBtnGroups 配置选项
 */
export declare interface OptBtnGroupsOptions {
    container: HTMLElement | string;
    showLabel?: boolean;
    visibility?: Record<string, boolean>;
}

/**
 * 操作按钮接口（内部使用，继承配置）
 */
export declare interface OptButton extends ButtonConfig {
    children?: OptButton[];
}

export { }
