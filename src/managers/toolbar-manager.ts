import type { ButtonGroupColors, ButtonConfig } from '../components/button-group/index.type';
import { Toolbar } from '../components/button-group/toolbar';
import type { ThemeConfig } from '../themes/types';

/**
 * 底部工具栏管理器 (ToolbarManager)
 * 仅负责管理底部工具栏实例。
 */
export class ToolbarManager {
    private toolbar: Toolbar | null = null;
    private toolbarContainer: HTMLElement | null = null;
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
        this.init();
    }

    private init() {
        // 创建底部工具栏专用容器
        this.toolbarContainer = document.createElement('div');
        this.toolbarContainer.id = 'opt-btn-groups';
        this.toolbarContainer.className = 'bim-engine-opt-btn-container is-bottom-toolbar';
        this.container.appendChild(this.toolbarContainer);

        this.toolbar = new Toolbar({
            container: this.toolbarContainer,
            showLabel: true,
            direction: 'row',
            position: 'bottom-center', // 底部居中
            align: 'vertical',         // 图标在上
            expand: 'up'               // 向上展开
        });

        this.toolbar.init();
    }

    public updateTheme(theme: ThemeConfig) {
        this.toolbar?.setTheme(theme);
    }

    public refresh() {
        this.toolbar?.render();
    }

    public destroy() {
        this.toolbar?.destroy();
        this.toolbar = null;
    }

    // --- 转发 API ---
    public addGroup(groupId: string, beforeGroupId?: string) { this.toolbar?.addGroup(groupId, beforeGroupId); this.toolbar?.render(); }
    public addButton(config: ButtonConfig) { this.toolbar?.addButton(config); this.toolbar?.render(); }
    public setButtonVisibility(id: string, v: boolean) { this.toolbar?.updateButtonVisibility(id, v); }
    public setShowLabel(show: boolean) { this.toolbar?.setShowLabel(show); }
    public setVisible(visible: boolean) {
        if (this.toolbarContainer) {
            this.toolbarContainer.style.visibility = visible ? 'visible' : 'hidden';
        }
    }
    public setBackgroundColor(color: string) { this.toolbar?.setBackgroundColor(color); }
    public setColors(colors: ButtonGroupColors) { this.toolbar?.setColors(colors); }
}
