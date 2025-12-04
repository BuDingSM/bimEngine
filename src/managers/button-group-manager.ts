import { BimButtonGroup } from '../components/button-group';
import type { ButtonGroupOptions } from '../components/button-group/index.type';
import type { ThemeConfig } from '../themes/types';

/**
 * 通用按钮组管理器
 * 负责创建和管理除底部工具栏以外的其他按钮组。
 */
export class ButtonGroupManager {
    private activeGroups: BimButtonGroup[] = [];
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    /**
     * 创建一个新的按钮组
     */
    public create(options: Omit<ButtonGroupOptions, 'container'>): BimButtonGroup {
        // 自动创建一个 div 作为容器
        const groupContainer = document.createElement('div');
        this.container.appendChild(groupContainer);

        const group = new BimButtonGroup({
            container: groupContainer,
            ...options
        });
        
        // 立即初始化
        group.init();
        this.activeGroups.push(group);
        return group;
    }

    public updateTheme(theme: ThemeConfig) {
        this.activeGroups.forEach(g => g.setTheme(theme));
    }

    public refresh() {
        this.activeGroups.forEach(g => g.render());
    }

    public destroy() {
        this.activeGroups.forEach(g => g.destroy());
        this.activeGroups = [];
    }
}
