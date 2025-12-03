import './bim-engine.css';
import { OptBtnGroups } from './toolbar';

export class BimEngine {
    private container: HTMLElement;
    private optBtnGroups: OptBtnGroups | null = null;

    constructor(container: HTMLElement | string) {
        const el = typeof container === 'string' ? document.getElementById(container) : container;
        if (!el) throw new Error('Container not found');
        this.container = el;
        this.init();
    }

    private init() {
        // 1. 清空容器可能存在的旧内容
        this.container.innerHTML = '';

        // 2. 创建外层容器 div
        const wrapper = document.createElement('div');
        wrapper.className = 'bim-engine-wrapper';

        // 3. 创建标题 h1
        const title = document.createElement('h1');
        title.textContent = 'BimEngine';
        title.className = 'bim-engine-title';

        // 4. 创建段落 p
        const desc = document.createElement('p');
        desc.textContent = '这是一个使用BIM-ENGINE。';
        desc.className = 'bim-engine-desc';

        // 6. 创建操作按钮组容器
        const btnGroupContainer = document.createElement('div');
        btnGroupContainer.id = 'opt-btn-groups';
        btnGroupContainer.className = 'bim-engine-opt-btn-container';

        // 7. 组装元素
        wrapper.appendChild(title);
        wrapper.appendChild(desc);
        wrapper.appendChild(btnGroupContainer); // 将按钮组放入 wrapper 中

        // 8. 挂载到主容器
        this.container.appendChild(wrapper);

        // 9. 初始化操作按钮组
        this.initOptBtnGroups(btnGroupContainer);
    }

    private initOptBtnGroups(container: HTMLElement) {
        this.optBtnGroups = new OptBtnGroups({
            container,
            showLabel: true
        });

        // 初始化并加载默认按钮
        this.optBtnGroups.init().catch(err => {
            console.error('Failed to initialize OptBtnGroups:', err);
        });
    }

    public destroy() {
        if (this.optBtnGroups) {
            this.optBtnGroups.destroy();
            this.optBtnGroups = null;
        }
        this.container.innerHTML = '';
    }
}