import './bim-engine.css';
import { ToolbarManager } from './modules/toolbar-manager';
import { DialogManager } from './modules/dialog-manager';

/**
 * BimEngine 主类
 * 负责初始化整个应用界面，协调各个子模块（如工具栏、弹窗等）。
 */
export class BimEngine {
    /** 主容器元素 */
    private container: HTMLElement;
    /** 内部包装器元素，用于承载所有 UI 组件 */
    private wrapper: HTMLElement | null = null;
    
    /** 工具栏管理器实例 */
    public toolbar: ToolbarManager | null = null;
    /** 弹窗管理器实例 */
    public dialog: DialogManager | null = null;

    /**
     * 构造函数
     * @param container 容器元素或容器 ID
     */
    constructor(container: HTMLElement | string) {
        const el = typeof container === 'string' ? document.getElementById(container) : container;
        if (!el) throw new Error('Container not found');
        this.container = el;
        this.init();
    }

    /**
     * 初始化方法
     * 创建 DOM 结构并初始化各子模块
     */
    private init() {
        // 1. 清空容器可能存在的旧内容
        this.container.innerHTML = '';

        // 2. 创建外层容器 div
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'bim-engine-wrapper';

        // 3. 创建标题 h1
        const title = document.createElement('h1');
        title.textContent = 'BimEngine';
        title.className = 'bim-engine-title';

        // 4. 创建描述段落 p
        const desc = document.createElement('p');
        desc.textContent = '这是一个使用BIM-ENGINE。';
        desc.className = 'bim-engine-desc';

        // 6. 创建操作按钮组容器
        const btnGroupContainer = document.createElement('div');
        btnGroupContainer.id = 'opt-btn-groups';
        btnGroupContainer.className = 'bim-engine-opt-btn-container';

        // 7. 组装元素
        this.wrapper.appendChild(title);
        this.wrapper.appendChild(desc);
        
        // 初始化管理器
        this.dialog = new DialogManager(this.wrapper);
        this.toolbar = new ToolbarManager(btnGroupContainer);

        // 5. 测试按钮（更新为使用管理器）
        // 5.1 创建普通测试弹窗按钮
        const dialogBtn = document.createElement('button');
        dialogBtn.textContent = '打开测试弹窗';
        dialogBtn.className = 'bim-engine-btn';
        dialogBtn.onclick = () => {
            this.dialog?.create({
                title: '测试弹窗',
                content: '<div style="padding: 10px;">这是一个 <b>可拖拽</b> 且 <b>可缩放</b> 的弹窗。<br><br>你可以尝试拖动标题栏，或者拖动右下角改变大小。</div>',
                width: 300,
                height: 400,
                position: 'top-left',
                draggable: true,
                resizable: true
            });
        };

        // 5.2 创建二次封装信息弹窗按钮
        const infoDialogBtn = document.createElement('button');
        infoDialogBtn.textContent = '打开信息弹窗 (封装版)';
        infoDialogBtn.className = 'bim-engine-btn';
        infoDialogBtn.style.marginLeft = '10px';
        infoDialogBtn.onclick = () => {
            this.dialog?.showInfoDialog();
        };

        // 将按钮和工具栏容器添加到包装器中
        this.wrapper.appendChild(dialogBtn);
        this.wrapper.appendChild(infoDialogBtn);
        this.wrapper.appendChild(btnGroupContainer);

        // 8. 将包装器挂载到主容器
        this.container.appendChild(this.wrapper);
    }

    /**
     * 销毁实例
     * 清理所有资源和 DOM 元素
     */
    public destroy() {
        if (this.toolbar) {
            this.toolbar.destroy();
            this.toolbar = null;
        }
        this.dialog = null;
        this.container.innerHTML = '';
    }
}