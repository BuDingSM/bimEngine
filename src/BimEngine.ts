export class BimEngine {
    private container: HTMLElement;

    constructor(container: HTMLElement | string) {
        const el = typeof container === 'string' ? document.getElementById(container) : container;
        if (!el) throw new Error('Container not found');
        this.container = el;
        this.init();
    }

    private init() {
        this.container.innerHTML = `
            <div style="font-family: sans-serif; color: #333;">
                <h1>BimEngine</h1>
                <p>这是一个纯 TypeScript 组件入口。</p>
            </div>
        `;
    }
}