import './index.css';
import type {
    OptButton,
    ButtonGroup,
    OptBtnGroupsOptions,
    ButtonConfig
} from './index.type';

export class OptBtnGroups {
    private container: HTMLElement;
    private options: OptBtnGroupsOptions;
    // 改用 Array 存储 Group，方便控制顺序
    private groups: ButtonGroup[] = [];
    private activeBtnIds: Set<string> = new Set();
    private btnRefs: Map<string, HTMLElement> = new Map();
    private dropdownElement: HTMLElement | null = null;
    private hoverTimeout: number | null = null;

    private readonly DEFAULT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>';

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
    }

    private initContainer(): void {
        this.container.innerHTML = '';
    }

    /**
     * 添加按钮组
     * @param groupId 组ID
     * @param beforeGroupId 在哪个组之前插入（可选），不传则插入到最后
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
     * 添加按钮
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
            // Add as sub-button
            const parentBtn = this.findButton(group.buttons, parentId);
            if (!parentBtn) {
                throw new Error(`Parent button ${parentId} not found in group ${groupId}`);
            }
            if (!parentBtn.children) {
                parentBtn.children = [];
            }
            parentBtn.children.push(button);
        } else {
            // Add as main button
            group.buttons.push(button);
        }
    }

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

    public async init(): Promise<void> {
        const { homeButton } = await import('./buttons/home');
        const { locationButton } = await import('./buttons/location');
        const { walkMenuButton } = await import('./buttons/walk/walk-menu');
        const { walkPersonButton } = await import('./buttons/walk/walk-person');
        const { walkBirdButton } = await import('./buttons/walk/walk-bird');
        const { settingButton } = await import('./buttons/setting');
        const { infoButton } = await import('./buttons/info');

        // 添加组1
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

    public render(): void {
        this.container.innerHTML = '';
        this.btnRefs.clear();

        const wrapper = document.createElement('div');
        wrapper.className = 'toolbar-container';

        // 直接遍历数组，顺序由 addGroup 控制
        this.groups.forEach((group, index) => {
            const groupElement = this.renderGroup(group, index, this.groups.length);
            wrapper.appendChild(groupElement);
        });

        this.container.appendChild(wrapper);
    }

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

    private renderButton(button: OptButton): HTMLElement {
        const wrapper = document.createElement('div');
        wrapper.className = 'opt-btn-wrapper';

        const btnEl = document.createElement('div');
        btnEl.className = 'opt-btn';

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

        const icon = document.createElement('div');
        icon.className = 'opt-btn-icon';
        icon.innerHTML = this.getIcon(button.icon);
        btnEl.appendChild(icon);

        if (this.options.showLabel && button.label) {
            const label = document.createElement('span');
            label.className = 'opt-btn-label';
            label.textContent = button.label;
            btnEl.appendChild(label);
        }

        if (button.children && button.children.length > 0) {
            const arrow = document.createElement('span');
            arrow.className = 'opt-btn-arrow';
            arrow.textContent = '▼';
            btnEl.appendChild(arrow);
        }

        btnEl.addEventListener('click', () => this.handleClick(button));
        btnEl.addEventListener('mouseenter', () => this.handleMouseEnter(button, btnEl));
        btnEl.addEventListener('mouseleave', () => this.handleMouseLeave());

        this.btnRefs.set(button.id, btnEl);

        wrapper.appendChild(btnEl);
        return wrapper;
    }

    private handleClick(button: OptButton): void {
        if (button.disabled) return;

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

    private handleMouseLeave(): void {
        this.hoverTimeout = window.setTimeout(() => {
            this.closeDropdown();
        }, 200);
    }

    private showDropdown(button: OptButton, btnEl: HTMLElement): void {
        this.closeDropdown();

        if (!button.children) return;

        const dropdown = document.createElement('div');
        dropdown.className = 'opt-btn-dropdown';

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

    private getIcon(icon?: string): string {
        return icon || this.DEFAULT_ICON;
    }

    private isVisible(id: string): boolean {
        return this.options.visibility?.[id] !== false;
    }

    public destroy(): void {
        this.closeDropdown();
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
        }
        this.container.innerHTML = '';
        this.btnRefs.clear();
        this.activeBtnIds.clear();
        this.groups = []; // 清空数组
    }
}