import { BimDialog } from '../components/dialog';
import { BimInfoDialog } from '../components/dialog/bimInfoDialog';
import type { DialogOptions } from '../components/dialog/index.type';
import type { ThemeConfig } from '../themes/types';
import { themeManager } from '../services/theme'; // 修正路径

/**
 * 弹窗管理器
 * 负责创建和管理应用中的各类弹窗。
 */
export class DialogManager {
    /** 弹窗挂载的父容器 */
    private container: HTMLElement;
    /** 活跃的弹窗实例列表 */
    private activeDialogs: BimDialog[] = [];

    /**
     * 构造函数
     * @param container 弹窗挂载的目标容器
     */
    constructor(container: HTMLElement) {
        this.container = container;
    }

    /**
     * 创建一个通用弹窗
     * @param options 弹窗配置选项（不需要传 container，自动使用管理器绑定的容器）
     * @returns BimDialog 实例
     */
    public create(options: Omit<DialogOptions, 'container'>): BimDialog {
        const dialog = new BimDialog({
            container: this.container,
            ...options,
            onClose: () => {
                // 从活跃列表中移除
                this.activeDialogs = this.activeDialogs.filter(d => d !== dialog);
                if (options.onClose) options.onClose();
            }
        });

        // 应用当前主题
        dialog.setTheme(themeManager.getTheme());

        this.activeDialogs.push(dialog);
        return dialog;
    }

    /**
     * 显示二次封装的模型信息弹窗
     * 演示如何调用特定的业务弹窗组件
     */
    public showInfoDialog() {
        // 最佳实践：所有弹窗应通过 create 统一管理，或者手动加入管理。
        new BimInfoDialog(this.container);
        // 暂时不做主题追踪，作为遗留逻辑保留
    }

    /**
     * 响应全局主题变更
     * @param theme 全局主题配置
     */
    public updateTheme(theme: ThemeConfig) {
        this.activeDialogs.forEach(dialog => {
            if (dialog.setTheme) {
                dialog.setTheme(theme);
            }
        });
    }
}