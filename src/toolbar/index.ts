import './index.css';
import type {
    OptButton,
    ButtonGroup,
    OptBtnGroupsOptions,
    ButtonConfig,
    ToolbarColors
} from './index.type';

/**
 * 底部操作按钮组组件
 * 负责渲染和管理底部工具栏的按钮、下拉菜单及相关交互。
 */
export class OptBtnGroups {
    /** 挂载容器 */
    private container: HTMLElement;
    /** 组件配置选项 */
    private options: OptBtnGroupsOptions;
    /** 按钮组列表，按顺序存储 */
    private groups: ButtonGroup[] = [];
    /** 当前处于激活状态的按钮 ID 集合 */
    private activeBtnIds: Set<string> = new Set();
    /** 按钮 DOM 元素的引用映射，方便快速查找 */
    private btnRefs: Map<string, HTMLElement> = new Map();
    /** 当��显示的下拉菜单元素 */
    private dropdownElement: HTMLElement | null = null;
    /** 鼠标悬停计时器，用于处理菜单显示的防抖 */
    private hoverTimeout: number | null = null;

    /** 默认图标 SVG */
    private readonly DEFAULT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>';

    /**
     * 构造函数
     * @param options 配置选项
     */
    constructor(options: OptBtnGroupsOptions) {
        const el = typeof options.container === 'string'
            ? document.getElementById(options.container)
            : options.container;

        if (!el) throw new Error('Container not found');

        this.container = el;
        this.options = {
            showLabel: true,
            visibility: {},
            ...options
        };

        this.initContainer();
        this.applyStyles(); // 应用初始样式配置
    }

    /**
     * 初始化容器
     */
    private initContainer(): void {
        this.container.innerHTML = '';
        this.container.classList.add('toolbar-root'); // 添加一个根类方便定位样式
    }

    /**
     * 应用样式配置到 CSS 变量
     */
    private applyStyles(): void {
        const style = this.container.style;
        if (this.options.backgroundColor) style.setProperty('--bim-toolbar-bg', this.options.backgroundColor);
        if (this.options.btnBackgroundColor) style.setProperty('--bim-btn-bg', this.options.btnBackgroundColor);
        if (this.options.btnHoverColor) style.setProperty('--bim-btn-hover-bg', this.options.btnHoverColor);
        if (this.options.btnActiveColor) style.setProperty('--bim-btn-active-bg', this.options.btnActiveColor);
        if (this.options.iconColor) style.setProperty('--bim-icon-color', this.options.iconColor);
        if (this.options.iconActiveColor) style.setProperty('--bim-icon-active-color', this.options.iconActiveColor);
        if (this.options.textColor) style.setProperty('--bim-btn-text-color', this.options.textColor);
        if (this.options.textActiveColor) style.setProperty('--bim-btn-text-active-color', this.options.textActiveColor);
    }

    /**
     * 更新颜色配置
     * @param colors 颜色配置对象
     */
    public setColors(colors: ToolbarColors): void {
        // 更新 options
        this.options = { ...this.options, ...colors };
        // 应用到 CSS 变量
        this.applyStyles();
    }

    /**
     * 添加按钮组
     * @param groupId 组ID
     * @param beforeGroupId 在哪个组之前插入（可选���，不传则插入到最后
     */
    public addGroup(groupId: string, beforeGroupId?: string): void {
        if (this.groups.some(g => g.id === groupId)) {
            console.warn('Group ' + groupId + ' already exists');
            return;
        }

        const newGroup: ButtonGroup = { id: groupId, buttons: [] };

        if (beforeGroupId) {
            const index = this.groups.findIndex(g => g.id === beforeGroupId);
            if (index !== -1) {
                this.groups.splice(index, 0, newGroup);
            } else {
                console.warn(`Target group ${beforeGroupId} not found, appending ${groupId} to end.`);
                this.groups.push(newGroup);
            }
        } else {
            this.groups.push(newGroup);
        }
    }

    /**
     * 添加按钮到指定组
     * @param config 按钮配置（必须包含 groupId，可选包含 parentId）
     */
    public addButton(config: ButtonConfig): void {
        const { groupId, parentId } = config;

        if (!groupId) {
            throw new Error(`Button ${config.id} config must contain 'groupId'`);
        }

        const group = this.groups.find(g => g.id === groupId);
        if (!group) {
            throw new Error(`Group ${groupId} not found. Please call addGroup first.`);
        }

        const button: OptButton = {
            ...config,
            children: config.children || []
        };

        if (parentId) {
            // 添加为子按钮（菜单项）
            const parentBtn = this.findButton(group.buttons, parentId);
            if (!parentBtn) {
                throw new Error(`Parent button ${parentId} not found in group ${groupId}`);
            }
            if (!parentBtn.children) {
                parentBtn.children = [];
            }
            parentBtn.children.push(button);
        } else {
            // 添加为主按钮
            group.buttons.push(button);
        }
    }

    /**
     * 递归查找按钮
     */
    private findButton(buttons: OptButton[], id: string): OptButton | undefined {
        for (const btn of buttons) {
            if (btn.id === id) return btn;
            if (btn.children) {
                const found = this.findButton(btn.children, id);
                if (found) return found;
            }
        }
        return undefined;
    }

    /**
     * 初始化组件，加载默认按钮配置
     */
    public async init(): Promise<void> {
        // 动态导入默认按钮配置
        const { homeButton } = await import('./buttons/home');
        const { locationButton } = await import('./buttons/location');
        const { walkMenuButton } = await import('./buttons/walk/walk-menu');
        const { walkPersonButton } = await import('./buttons/walk/walk-person');
        const { walkBirdButton } = await import('./buttons/walk/walk-bird');
        const { settingButton } = await import('./buttons/setting');
        const { infoButton } = await import('./buttons/info');

        // 配置默认组和按钮
        this.addGroup('group-1');
        this.addButton(homeButton);
        this.addButton(walkMenuButton);
        this.addButton(walkPersonButton);
        this.addButton(walkBirdButton);
        this.addButton(locationButton);
        this.addGroup('group-2');
        this.addButton(settingButton);
        this.addButton(infoButton);
        this.render();
    }

    /**
     * 渲染整个工具栏
     */
    public render(): void {
        this.container.innerHTML = '';
        this.btnRefs.clear();

        const wrapper = document.createElement('div');
        wrapper.className = 'toolbar-container';

        // 渲染所有组
        this.groups.forEach((group, index) => {
            const groupElement = this.renderGroup(group, index, this.groups.length);
            wrapper.appendChild(groupElement);
        });

        this.container.appendChild(wrapper);
    }

    /**
     * 渲染单个按钮组
     */
    private renderGroup(group: ButtonGroup, index: number, total: number): HTMLElement {
        const groupEl = document.createElement('div');
        groupEl.className = 'opt-btn-group';

        if (index < total - 1) {
            groupEl.classList.add('has-divider');
        }

        group.buttons.forEach(button => {
            if (this.isVisible(button.id)) {
                const btnWrapper = this.renderButton(button);
                groupEl.appendChild(btnWrapper);
            }
        });

        return groupEl;
    }

    /**
     * 渲染单个按钮
     */
    private renderButton(button: OptButton): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.className = 'opt-btn-wrapper';

        const btnEl = document.createElement('div');
        btnEl.className = 'opt-btn';

        // 设置激活状态
        if (this.activeBtnIds.has(button.id)) {
            btnEl.classList.add('active');
        }

        if (button.disabled) {
            btnEl.classList.add('disabled');
        }

        if (!this.options.showLabel) {
            btnEl.classList.add('no-label');
            if (button.label) {
                btnEl.title = button.label;
            }
        }

        // 渲染图标
        const icon = document.createElement('div');
        icon.className = 'opt-btn-icon';
        icon.innerHTML = this.getIcon(button.icon);
        btnEl.appendChild(icon);

        // 渲染标签
        if (this.options.showLabel && button.label) {
            const label = document.createElement('span');
            label.className = 'opt-btn-label';
            label.textContent = button.label;
            btnEl.appendChild(label);
        }

        // 如果有子菜单，渲染箭头
        if (button.children && button.children.length > 0) {
            const arrow = document.createElement('span');
            arrow.className = 'opt-btn-arrow';
            arrow.textContent = '▼';
            btnEl.appendChild(arrow);
        }

        // 绑定事件
        btnEl.addEventListener('click', () => this.handleClick(button));
        btnEl.addEventListener('mouseenter', () => this.handleMouseEnter(button, btnEl));
        btnEl.addEventListener('mouseleave', () => this.handleMouseLeave());

        this.btnRefs.set(button.id, btnEl);

        wrapper.appendChild(btnEl);
        return wrapper;
    }

    /**
     * 处理按钮点击事件
     */
    private handleClick(button: OptButton): void {
        if (button.disabled) return;

        // 如果没有子菜单，直接触发
        if (!button.children || button.children.length === 0) {
            if (button.keepActive) {
                const wasActive = this.activeBtnIds.has(button.id);
                if (wasActive) {
                    this.activeBtnIds.delete(button.id);
                } else {
                    this.activeBtnIds.add(button.id);
                }
                this.updateButtonState(button.id);
            }

            this.closeDropdown();

            if (button.onClick) {
                button.onClick(button);
            }
        }
    }

    /**
     * 处理子菜单项点击事件
     */
    private handleSubClick(button: OptButton): void {
        if (button.keepActive) {
            const wasActive = this.activeBtnIds.has(button.id);
            if (wasActive) {
                this.activeBtnIds.delete(button.id);
            } else {
                this.activeBtnIds.add(button.id);
            }
            this.updateButtonState(button.id);
        }

        this.closeDropdown();

        if (button.onClick) {
            button.onClick(button);
        }
    }

    /**
     * 处理鼠标移入事件（显示菜单）
     */
    private handleMouseEnter(button: OptButton, btnEl: HTMLElement): void {
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = null;
        }

        if (button.children && button.children.length > 0) {
            this.showDropdown(button, btnEl);

            const arrow = btnEl.querySelector('.opt-btn-arrow');
            if (arrow) {
                arrow.classList.add('rotated');
            }
        } else {
            this.closeDropdown();
        }
    }

    /**
     * 处理鼠标移出事件（隐藏菜单）
     */
    private handleMouseLeave(): void {
        this.hoverTimeout = window.setTimeout(() => {
            this.closeDropdown();
        }, 200);
    }

    /**
     * 显示下拉菜单
     */
    private showDropdown(button: OptButton, btnEl: HTMLElement): void {
        this.closeDropdown();

        if (!button.children) return;

        const dropdown = document.createElement('div');
        dropdown.className = 'opt-btn-dropdown';
        
        // 下拉菜单也应用当前的 CSS 变量样式，因为它们通常挂载在 body 上，所以需要单独设置或者确保能继承
        // 简单起见，我们可以直接将容器上的 CSS 变量复制过来，或者设置内联样式
        // 更好的是：如果我们在 this.container 上设置 CSS 变量，
        // 而 dropdown 挂载在 body 上，它无法继承。
        // 所以我们需要将 CSS 变量也应用到 dropdown 上。
        
        const style = dropdown.style;
        if (this.options.backgroundColor) style.setProperty('--bim-toolbar-bg', this.options.backgroundColor);
        if (this.options.btnBackgroundColor) style.setProperty('--bim-btn-bg', this.options.btnBackgroundColor);
        if (this.options.btnHoverColor) style.setProperty('--bim-btn-hover-bg', this.options.btnHoverColor);
        if (this.options.btnActiveColor) style.setProperty('--bim-btn-active-bg', this.options.btnActiveColor);
        if (this.options.iconColor) style.setProperty('--bim-icon-color', this.options.iconColor);
        if (this.options.iconActiveColor) style.setProperty('--bim-icon-active-color', this.options.iconActiveColor);
        if (this.options.textColor) style.setProperty('--bim-btn-text-color', this.options.textColor);
        if (this.options.textActiveColor) style.setProperty('--bim-btn-text-active-color', this.options.textActiveColor);

        const rect = btnEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;

        dropdown.style.top = rect.top - 8 + 'px';
        dropdown.style.left = centerX + 'px';

        button.children.forEach(subBtn => {
            if (this.isVisible(subBtn.id)) {
                const item = this.renderDropdownItem(subBtn);
                dropdown.appendChild(item);
            }
        });

        // 保持菜单显���
        dropdown.addEventListener('mouseenter', () => {
            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
                this.hoverTimeout = null;
            }
        });

        dropdown.addEventListener('mouseleave', () => this.handleMouseLeave());

        document.body.appendChild(dropdown);
        this.dropdownElement = dropdown;
    }

    /**
     * 渲染下拉菜单项
     */
    private renderDropdownItem(button: OptButton): HTMLElement {
        const item = document.createElement('div');
        item.className = 'opt-btn-dropdown-item';

        const icon = document.createElement('div');
        icon.className = 'opt-btn-icon small';
        icon.innerHTML = this.getIcon(button.icon);
        item.appendChild(icon);

        if (this.options.showLabel) {
            const label = document.createElement('span');
            label.textContent = button.label;
            item.appendChild(label);
        }

        item.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleSubClick(button);
        });

        return item;
    }

    /**
     * 关闭所有下拉菜单
     */
    private closeDropdown(): void {
        if (this.dropdownElement) {
            this.dropdownElement.remove();
            this.dropdownElement = null;
        }

        this.btnRefs.forEach(btnEl => {
            const arrow = btnEl.querySelector('.opt-btn-arrow');
            if (arrow) {
                arrow.classList.remove('rotated');
            }
        });
    }

    /**
     * 更新按钮的激活状态样式
     */
    private updateButtonState(buttonId: string): void {
        const btnEl = this.btnRefs.get(buttonId);
        if (btnEl) {
            if (this.activeBtnIds.has(buttonId)) {
                btnEl.classList.add('active');
            } else {
                btnEl.classList.remove('active');
            }
        }
    }

    /**
     * 获取图标 SVG 字符串
     */
    private getIcon(icon?: string): string {
        return icon || this.DEFAULT_ICON;
    }

    /**
     * 更新按钮可见性
     * @param buttonId 按钮ID
     * @param visible 是否可见
     */
    public updateButtonVisibility(buttonId: string, visible: boolean): void {
        if (!this.options.visibility) {
            this.options.visibility = {};
        }
        this.options.visibility[buttonId] = visible;
        this.render();
    }

    /**
     * 设置是否显示标签
     * @param show 是否显示
     */
    public setShowLabel(show: boolean): void {
        this.options.showLabel = show;
        this.render();
    }

    /**
     * 设置背景颜色 (兼容旧接口)
     * @param color CSS 颜色值
     */
    public setBackgroundColor(color: string): void {
        this.setColors({ backgroundColor: color });
    }

    /**
     * 检查按钮是否可见
     */
    private isVisible(id: string): boolean {
        return this.options.visibility?.[id] !== false;
    }

    /**
     * 销毁组件，清理资源
     */
    public destroy(): void {
        this.closeDropdown();
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
        }
        this.container.innerHTML = '';
        this.btnRefs.clear();
        this.activeBtnIds.clear();
        this.groups = [];
    }
}