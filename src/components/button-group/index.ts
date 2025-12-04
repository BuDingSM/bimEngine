import './index.css';
import type {
    OptButton,
    ButtonGroup,
    ButtonGroupOptions,
    ButtonConfig,
    ButtonGroupColors
} from './index.type';
import { t, localeManager } from '../../services/locale';
import { themeManager } from '../../services/theme';
import type { ThemeConfig } from '../../themes/types';
import { IBimComponent } from '../../types/component';

/**
 * 通用按钮组组件 (BimButtonGroup)
 */
export class BimButtonGroup implements IBimComponent {
    private container: HTMLElement;
    private options: ButtonGroupOptions;
    private groups: ButtonGroup[] = [];
    private activeBtnIds: Set<string> = new Set();
    private btnRefs: Map<string, HTMLElement> = new Map();
    private dropdownElement: HTMLElement | null = null;
    private hoverTimeout: number | null = null;
    private customColors: Set<keyof ButtonGroupColors> = new Set(); // 记录用户自定义的颜色属性
    private unsubscribeLocale: (() => void) | null = null;
    private unsubscribeTheme: (() => void) | null = null;

    private readonly DEFAULT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>';

    constructor(options: ButtonGroupOptions) {
        const el = typeof options.container === 'string'
            ? document.getElementById(options.container)
            : options.container;

        if (!el) throw new Error('Container not found');

        this.container = el;
        // 合并默认配置
        this.options = {
            showLabel: true,
            visibility: {},
            direction: 'row', // 默认横向
            position: 'static',   // 默认静态定位
            align: 'vertical',    // 默认图标在上
            expand: 'down',       // 默认向下展开
            ...options
        };

        // 记录初始传入的自定义颜色
        const colorKeys: (keyof ButtonGroupColors)[] = [
            'backgroundColor', 'btnBackgroundColor', 'btnHoverColor',
            'btnActiveColor', 'iconColor', 'iconActiveColor',
            'textColor', 'textActiveColor'
        ];
        colorKeys.forEach(key => {
            if (options[key]) {
                this.customColors.add(key);
            }
        });

        this.initContainer();
        this.applyStyles();
    }

    private initContainer(): void {
        this.container.innerHTML = '';
        this.container.classList.add('bim-btn-group-root');

        if (this.options.direction === 'column') {
            this.container.classList.add('dir-column');
        } else {
            this.container.classList.add('dir-row');
        }

        if (this.options.className) {
            this.container.classList.add(this.options.className);
        }

        this.updatePosition();
    }

    private updatePosition() {
        const pos = this.options.position;
        const style = this.container.style;

        style.top = ''; style.bottom = ''; style.left = ''; style.right = ''; style.transform = '';

        if (pos === 'static') {
            this.container.classList.add('static');
            return;
        }

        this.container.classList.remove('static');
        this.container.style.position = 'absolute';

        if (typeof pos === 'object' && 'x' in pos) {
            style.left = `${pos.x}px`;
            style.top = `${pos.y}px`;
        } else {
            const margin = '20px';
            switch (pos) {
                case 'top-left':
                    style.top = margin; style.left = margin;
                    break;
                case 'top-center':
                    style.top = margin; style.left = '50%'; style.transform = 'translateX(-50%)';
                    break;
                case 'top-right':
                    style.top = margin; style.right = margin;
                    break;
                case 'bottom-left':
                    style.bottom = margin; style.left = margin;
                    break;
                case 'bottom-center':
                    style.bottom = margin; style.left = '50%'; style.transform = 'translateX(-50%)';
                    break;
                case 'bottom-right':
                    style.bottom = margin; style.right = margin;
                    break;
                case 'left-center':
                    style.left = margin; style.top = '50%'; style.transform = 'translateY(-50%)';
                    break;
                case 'right-center':
                    style.right = margin; style.top = '50%'; style.transform = 'translateY(-50%)';
                    break;
                case 'center':
                    style.top = '50%'; style.left = '50%'; style.transform = 'translate(-50%, -50%)';
                    break;
            }
        }
    }

    /**
     * 应用样式到容器
     */
    private applyStyles(): void {
        const style = this.container.style;
        if (this.options.backgroundColor) style.setProperty('--bim-btn-group-section-bg', this.options.backgroundColor);
        if (this.options.btnBackgroundColor) style.setProperty('--bim-btn-bg', this.options.btnBackgroundColor);
        if (this.options.btnHoverColor) style.setProperty('--bim-btn-hover-bg', this.options.btnHoverColor);
        if (this.options.btnActiveColor) style.setProperty('--bim-btn-active-bg', this.options.btnActiveColor);
        if (this.options.iconColor) style.setProperty('--bim-icon-color', this.options.iconColor);
        if (this.options.iconActiveColor) style.setProperty('--bim-icon-active-color', this.options.iconActiveColor);
        if (this.options.textColor) style.setProperty('--bim-btn-text-color', this.options.textColor);
        if (this.options.textActiveColor) style.setProperty('--bim-btn-text-active-color', this.options.textActiveColor);
    }

    /**
     * 设置主题颜色
     * 只会应用到没有被用户自定义的颜色属性上
     */
    public setTheme(theme: ThemeConfig): void {
        const themeColors: ButtonGroupColors = {
            backgroundColor: theme.panelBackground,
            btnBackgroundColor: theme.componentBackground,
            btnHoverColor: theme.componentHover,
            btnActiveColor: theme.componentActive,
            iconColor: theme.icon,
            iconActiveColor: theme.iconActive,
            textColor: theme.textSecondary,
            textActiveColor: theme.textPrimary
        };

        // 只应用没有被自定义的颜色
        Object.entries(themeColors).forEach(([key, value]) => {
            const colorKey = key as keyof ButtonGroupColors;
            if (!this.customColors.has(colorKey)) {
                this.options[colorKey] = value;
            }
        });

        this.applyStyles();
    }

    /**
     * 直接设置颜色（强制覆盖）
     * 设置的颜色会被标记为自定义，后续的 setTheme 不会覆盖它们
     */
    public setColors(colors: ButtonGroupColors): void {
        // 更新 options
        this.options = { ...this.options, ...colors };

        // 标记这些颜色为自定义
        Object.keys(colors).forEach(key => {
            this.customColors.add(key as keyof ButtonGroupColors);
        });

        this.applyStyles();
    }

    public async init(): Promise<void> {
        this.render();

        // 自动订阅语言变更
        this.unsubscribeLocale = localeManager.subscribe(() => {
            this.setLocales();
        });

        // 自动订阅主题变更
        this.unsubscribeTheme = themeManager.subscribe((theme) => {
            this.setTheme(theme);
        });
    }

    public setLocales(): void {
        this.render();
    }

    public addGroup(groupId: string, beforeGroupId?: string): void {
        if (this.groups.some(g => g.id === groupId)) return;
        const newGroup: ButtonGroup = { id: groupId, buttons: [] };
        if (beforeGroupId) {
            const index = this.groups.findIndex(g => g.id === beforeGroupId);
            index !== -1 ? this.groups.splice(index, 0, newGroup) : this.groups.push(newGroup);
        } else {
            this.groups.push(newGroup);
        }
    }

    public addButton(config: ButtonConfig): void {
        const { groupId, parentId } = config;
        const group = this.groups.find(g => g.id === groupId);
        if (!group) return;

        const button: OptButton = { ...config, children: config.children || [] };
        if (parentId) {
            const parentBtn = this.findButton(group.buttons, parentId);
            if (parentBtn) {
                if (!parentBtn.children) parentBtn.children = [];
                parentBtn.children.push(button);
            }
        } else {
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

    public render(): void {
        this.container.innerHTML = '';
        this.btnRefs.clear();

        this.groups.forEach((group, index) => {
            const groupElement = this.renderGroup(group, index, this.groups.length);
            this.container.appendChild(groupElement);
        });
    }

    private renderGroup(group: ButtonGroup, index: number, total: number): HTMLElement {
        const groupEl = document.createElement('div');
        groupEl.className = 'bim-btn-group-section';

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

        // 按钮优先使用自己的 align，否则使用全局配置，默认为 vertical
        const align = button.align || this.options.align || 'vertical';
        if (align === 'horizontal') {
            btnEl.classList.add('align-horizontal');
        } else {
            btnEl.classList.add('align-vertical');
        }

        if (this.activeBtnIds.has(button.id)) btnEl.classList.add('active');
        if (button.disabled) btnEl.classList.add('disabled');

        // 判断是否显示 label
        const hasLabel = this.options.showLabel && button.label;
        if (!hasLabel) {
            btnEl.classList.add('no-label');
        }

        // 应用按钮的自定义样式
        const iconSize = button.iconSize || 32;
        const minWidth = button.minWidth || 50;
        btnEl.style.minWidth = `${minWidth}px`;

        const icon = document.createElement('div');
        icon.className = 'opt-btn-icon';
        icon.style.width = `${iconSize}px`;
        icon.style.height = `${iconSize}px`;
        icon.innerHTML = this.getIcon(button.icon);
        btnEl.appendChild(icon);

        // 创建文字和箭头的容器，确保它们始终在一起（无论主轴是横是竖）
        const textWrapper = document.createElement('div');
        textWrapper.className = 'opt-btn-text-wrapper';

        if (this.options.showLabel && button.label) {
            const label = document.createElement('span');
            label.className = 'opt-btn-label';
            label.textContent = t(button.label);
            textWrapper.appendChild(label);
        }

        if (button.children && button.children.length > 0) {
            const arrow = document.createElement('span');
            arrow.className = 'opt-btn-arrow';
            arrow.textContent = '▼';
            textWrapper.appendChild(arrow);
        }

        // 只有当有内容时才添加 wrapper
        if (textWrapper.hasChildNodes()) {
            btnEl.appendChild(textWrapper);
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
                if (wasActive) this.activeBtnIds.delete(button.id);
                else this.activeBtnIds.add(button.id);
                this.updateButtonState(button.id);
            }
            this.closeDropdown();
            if (button.onClick) button.onClick(button);
        }
    }

    private handleMouseEnter(button: OptButton, btnEl: HTMLElement): void {
        if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
        if (button.children && button.children.length > 0) {
            this.showDropdown(button, btnEl);
        } else {
            this.closeDropdown();
        }
    }

    private handleMouseLeave(): void {
        this.hoverTimeout = window.setTimeout(() => this.closeDropdown(), 200);
    }

    private showDropdown(button: OptButton, btnEl: HTMLElement): void {
        this.closeDropdown();
        if (!button.children) return;

        const dropdown = document.createElement('div');
        dropdown.className = 'opt-btn-dropdown';
        if (this.options.backgroundColor) dropdown.style.setProperty('--bim-toolbar-bg', this.options.backgroundColor);

        // 获取按钮的位置信息
        const btnRect = btnEl.getBoundingClientRect();
        const expand = this.options.expand || 'down';

        // 根据主按钮组的方向设置下拉菜单的布局方向
        if (this.options.direction === 'row') {
            dropdown.style.flexDirection = 'column'; // 横向按钮组，菜单纵向排列
        } else {
            dropdown.style.flexDirection = 'row'; // 纵向按钮组，菜单横向排列
        }

        // 先添加到 DOM 以便计算尺寸
        document.body.appendChild(dropdown);

        // 添加菜单项
        button.children.forEach(subBtn => {
            if (this.isVisible(subBtn.id)) {
                const item = this.renderDropdownItem(subBtn);
                dropdown.appendChild(item);
            }
        });

        // 获取下拉菜单的实际尺寸
        const dropdownRect = dropdown.getBoundingClientRect();

        if (expand === 'up') {
            // 向上展开，与按钮水平居中对齐
            dropdown.style.bottom = (window.innerHeight - btnRect.top + 8) + 'px';
            dropdown.style.left = (btnRect.left + (btnRect.width - dropdownRect.width) / 2) + 'px';
        } else if (expand === 'down') {
            // 向下展开，与按钮水平居中对齐
            dropdown.style.top = (btnRect.bottom + 8) + 'px';
            dropdown.style.left = (btnRect.left + (btnRect.width - dropdownRect.width) / 2) + 'px';
        } else if (expand === 'right') {
            // 向右展开，与按钮垂直居中对齐
            dropdown.style.top = (btnRect.top + (btnRect.height - dropdownRect.height) / 2) + 'px';
            dropdown.style.left = (btnRect.right + 8) + 'px';
        } else if (expand === 'left') {
            // 向左展开，与按钮垂直居中对齐
            dropdown.style.top = (btnRect.top + (btnRect.height - dropdownRect.height) / 2) + 'px';
            dropdown.style.right = (window.innerWidth - btnRect.left + 8) + 'px';
        }

        dropdown.addEventListener('mouseenter', () => { if (this.hoverTimeout) clearTimeout(this.hoverTimeout); });
        dropdown.addEventListener('mouseleave', () => this.handleMouseLeave());
        this.dropdownElement = dropdown;
    }

    private renderDropdownItem(button: OptButton): HTMLElement {
        const item = document.createElement('div');
        item.className = 'opt-btn-dropdown-item';

        // 应用按钮的 align 设置，默认为 horizontal（图标在左）
        const align = button.align || 'horizontal';
        if (align === 'horizontal') {
            item.classList.add('align-horizontal');
        } else {
            item.classList.add('align-vertical');
        }

        // 应用按钮的自定义样式
        const iconSize = button.iconSize || 32; // 二级菜单默认图标更小
        const minWidth = button.minWidth; // 不设置默认值，让下拉菜单项保持紧凑
        if (minWidth) {
            item.style.minWidth = `${minWidth}px`;
        }

        const icon = document.createElement('div');
        icon.className = 'opt-btn-icon';
        icon.style.width = `${iconSize}px`;
        icon.style.height = `${iconSize}px`;
        icon.innerHTML = this.getIcon(button.icon);
        item.appendChild(icon);

        // 只有在 showLabel 为 true 时才显示 label
        if (this.options.showLabel && button.label) {
            const label = document.createElement('span');
            label.className = 'opt-btn-dropdown-label';
            label.textContent = t(button.label);
            item.appendChild(label);
        }

        item.addEventListener('click', (e) => { e.stopPropagation(); this.handleClick(button); });
        return item;
    }

    private closeDropdown(): void {
        if (this.dropdownElement) {
            this.dropdownElement.remove();
            this.dropdownElement = null;
        }
        this.btnRefs.forEach(btnEl => {
            const arrow = btnEl.querySelector('.opt-btn-arrow');
            if (arrow) arrow.classList.remove('rotated');
        });
    }

    private updateButtonState(buttonId: string): void {
        const btnEl = this.btnRefs.get(buttonId);
        if (btnEl) {
            this.activeBtnIds.has(buttonId) ? btnEl.classList.add('active') : btnEl.classList.remove('active');
        }
    }

    private getIcon(icon?: string): string { return icon || this.DEFAULT_ICON; }
    public updateButtonVisibility(id: string, visible: boolean): void {
        if (!this.options.visibility) this.options.visibility = {};
        this.options.visibility[id] = visible;
        this.render();
    }
    public setShowLabel(show: boolean): void {
        this.options.showLabel = show;
        this.updateLabelsVisibility();
    }

    private updateLabelsVisibility(): void {
        this.btnRefs.forEach((btnEl, buttonId) => {
            // 查找按钮配置
            const button = this.findButtonById(buttonId);
            if (!button) return;

            const hasLabel = this.options.showLabel && button.label;

            // 只需要更新 no-label 类，CSS 会处理显示/隐藏
            if (hasLabel) {
                btnEl.classList.remove('no-label');
            } else {
                btnEl.classList.add('no-label');
            }
        });
    }

    private findButtonById(id: string): OptButton | undefined {
        for (const group of this.groups) {
            const found = this.findButton(group.buttons, id);
            if (found) return found;
        }
        return undefined;
    }
    public setBackgroundColor(color: string): void { this.setColors({ backgroundColor: color }); }
    private isVisible(id: string): boolean { return this.options.visibility?.[id] !== false; }
    public destroy(): void {
        if (this.unsubscribeLocale) {
            this.unsubscribeLocale();
            this.unsubscribeLocale = null;
        }
        if (this.unsubscribeTheme) {
            this.unsubscribeTheme();
            this.unsubscribeTheme = null;
        }
        this.closeDropdown();
        this.container.innerHTML = '';
        this.btnRefs.clear();
    }
}
