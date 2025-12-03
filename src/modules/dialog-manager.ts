import { BimDialog } from '../dialog';
import { BimInfoDialog } from '../dialog/bimInfoDialog';
import type { DialogOptions } from '../dialog/index.type';

/**
 * 弹窗管理器
 * 负责创建和管理应用中的各类弹窗。
 */
export class DialogManager {
    /** 弹窗挂载的父容器 */
    private container: HTMLElement;

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
        return new BimDialog({
            container: this.container,
            ...options
        });
    }

    /**
     * 显示二次封装的模型信息弹窗
     * 演示如何调用特定的业务弹窗组件
     */
    public showInfoDialog() {
        new BimInfoDialog(this.container);
    }
}