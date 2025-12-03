import type { ToolbarColors } from '../toolbar/index.type';
import { OptBtnGroups } from '../toolbar';
import type { ButtonConfig } from '../toolbar/index.type';

/**
 * 工具栏管理器
 * 负责管理底部操作栏的按钮组、按钮及其可见性等状态。
 */
export class ToolbarManager {
    /** 内部工具栏组件实例 */
    private optBtnGroups: OptBtnGroups | null = null;
    /** 工具栏挂载的容器 */
    private container: HTMLElement;

    /**
     * 构造函数
     * @param container 工具栏挂载的容器元素
     */
    constructor(container: HTMLElement) {
        this.container = container;
        this.init();
    }

    /**
     * 初始化工具栏
     */
    private init() {
        this.optBtnGroups = new OptBtnGroups({
            container: this.container,
            showLabel: true
        });

        // 初始化并加载默认按钮配置
        this.optBtnGroups.init().catch(err => {
            console.error('Failed to initialize OptBtnGroups:', err);
        });
    }

    /**
     * 添加一个工具栏按钮组
     * @param groupId 新组的 ID
     * @param beforeGroupId (可选) 插入到哪个组之前，不传则追加到最后
     */
    public addGroup(groupId: string, beforeGroupId?: string) {
        if (this.optBtnGroups) {
            this.optBtnGroups.addGroup(groupId, beforeGroupId);
            this.optBtnGroups.render(); // 重新渲染以更新 UI
        } else {
            console.warn('Toolbar not initialized yet.');
        }
    }

    /**
     * 添加一个工具栏按钮
     * @param config 按钮配置对象
     */
    public addButton(config: ButtonConfig) {
        if (this.optBtnGroups) {
            this.optBtnGroups.addButton(config);
            this.optBtnGroups.render(); // 重新渲染以更新 UI
        } else {
            console.warn('Toolbar not initialized yet.');
        }
    }

    /**
     * 设置按钮的可见性
     * @param buttonId 按钮 ID
     * @param visible 是否可见
     */
    public setButtonVisibility(buttonId: string, visible: boolean) {
        if (this.optBtnGroups) {
            this.optBtnGroups.updateButtonVisibility(buttonId, visible);
        } else {
            console.warn('Toolbar not initialized yet.');
        }
    }

    /**
     * 设置是否显示按钮下方的文字标签
     * @param show 是否显示
     */
    public setShowLabel(show: boolean) {
        if (this.optBtnGroups) {
            this.optBtnGroups.setShowLabel(show);
        } else {
            console.warn('Toolbar not initialized yet.');
        }
    }

    /**
     * 设置整个工具栏的可见性
     * @param visible 是否可见
     */
    public setVisible(visible: boolean) {
        this.container.style.display = visible ? 'block' : 'none';
    }

    /**
     * 设置工具栏背景颜色
     * @param color CSS 颜色值
     */
    public setBackgroundColor(color: string) {
        if (this.optBtnGroups) {
            this.optBtnGroups.setBackgroundColor(color);
        } else {
            console.warn('Toolbar not initialized yet.');
        }
    }

    /**
     * 设置工具栏详细颜色配置
     * @param colors 颜色配置对象
     */
    public setColors(colors: ToolbarColors) {
        if (this.optBtnGroups) {
            this.optBtnGroups.setColors(colors);
        } else {
            console.warn('Toolbar not initialized yet.');
        }
    }

    /**
     * 销毁工具栏管理器
     */
    public destroy() {
        if (this.optBtnGroups) {
            this.optBtnGroups.destroy();
            this.optBtnGroups = null;
        }
    }
}
