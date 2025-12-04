import './index.css';
import type { DialogOptions } from './index.type';
import type { ThemeConfig } from '../../themes/types';
import { IBimComponent } from '../../types/component';
import { themeManager } from '../../services/theme';
import { t, localeManager } from '../../services/locale';

/**
 * 通用弹窗组件类
 * 支持拖拽、缩放、自定义内容和位置。
 */
export class BimDialog implements IBimComponent {
    private element: HTMLElement;
    private options: DialogOptions;
    private container: HTMLElement;
    private header: HTMLElement;
    private contentArea: HTMLElement;
    private _isDestroyed = false;
    private _isInitialized = false;
    private unsubscribeTheme: (() => void) | null = null;
    private unsubscribeLocale: (() => void) | null = null;

    // 性能优化：用于存储 requestAnimationFrame 的 ID
    private rafId: number | null = null;

    /**
     * 构造函数
     * @param options 弹窗配置选项
     */
    constructor(options: DialogOptions) {
        // 合并默认配置
        this.options = {
            title: 'Dialog',
            width: 300,
            height: 'auto',
            position: 'center',
            draggable: true,
            resizable: false,
            minWidth: 200,
            minHeight: 100,
            ...options
        };
        this.container = options.container;

        // 创建 DOM 结构
        this.element = this.createDom();
        this.header = this.element.querySelector('.bim-dialog-header') as HTMLElement;
        this.contentArea = this.element.querySelector('.bim-dialog-content') as HTMLElement;

        // 自动初始化 (为了兼容现有逻辑)
        this.init();
    }

    /**
     * 设置主题
     * @param theme 全局主题配置
     */
    public setTheme(theme: ThemeConfig) {
        const style = this.element.style;
        if (!this.options.backgroundColor) style.setProperty('--bim-dialog-bg', theme.panelBackground);
        if (!this.options.headerBackgroundColor) style.setProperty('--bim-dialog-header-bg', theme.componentHover);
        if (!this.options.titleColor) style.setProperty('--bim-dialog-title-color', theme.textPrimary);
        if (!this.options.textColor) style.setProperty('--bim-dialog-text-color', theme.textPrimary);
        if (!this.options.borderColor) style.setProperty('--bim-dialog-border-color', theme.border);
    }

    /**
     * 初始化组件功能 (接口实现)
     */
    public init() {
        if (this._isInitialized) return;

        this.container.appendChild(this.element);

        // 必须先挂载才能计算尺寸进行定位
        this.initPosition();

        if (this.options.draggable) {
            this.initDrag();
        }

        if (this.options.resizable) {
            this.initResize();
        }

        this._isInitialized = true;

        // 调用弹窗开启后回调
        if (this.options.onOpen) {
            this.options.onOpen();
        }

        // 自动订阅主题变更
        this.unsubscribeTheme = themeManager.subscribe((theme) => {
            this.setTheme(theme);
        });

        // 自动订阅语言变更
        this.unsubscribeLocale = localeManager.subscribe(() => {
            this.setLocales();
        });
    }

    public setLocales(): void {
        if (this.options.title) {
            const titleEl = this.header.querySelector('.bim-dialog-title');
            if (titleEl) {
                titleEl.textContent = t(this.options.title);
            }
        }
    }

    /**
     * 创建弹窗的 DOM 结构
     */
    private createDom(): HTMLElement {
        const el = document.createElement('div');
        el.className = 'bim-dialog';

        if (this.options.id) el.id = this.options.id;

        // 应用颜色配置到 CSS 变量
        const style = el.style;
        if (this.options.backgroundColor) style.setProperty('--bim-dialog-bg', this.options.backgroundColor);
        if (this.options.headerBackgroundColor) style.setProperty('--bim-dialog-header-bg', this.options.headerBackgroundColor);
        if (this.options.titleColor) style.setProperty('--bim-dialog-title-color', this.options.titleColor);
        if (this.options.textColor) style.setProperty('--bim-dialog-text-color', this.options.textColor);
        if (this.options.borderColor) style.setProperty('--bim-dialog-border-color', this.options.borderColor);

        // 设置初始尺寸
        this.setSize(el, this.options.width, this.options.height);

        // 创建标题栏 (Header)
        const header = document.createElement('div');
        header.className = 'bim-dialog-header';
        if (this.options.draggable) header.classList.add('draggable');

        const title = document.createElement('span');
        title.className = 'bim-dialog-title';
        title.textContent = this.options.title ? t(this.options.title) : '';

        const closeBtn = document.createElement('span');
        closeBtn.className = 'bim-dialog-close';
        closeBtn.innerHTML = '&times;';
        // 修复 TS 报错：去掉未使用的参数 e
        closeBtn.onclick = () => {
            this.close();
        };

        header.appendChild(title);
        header.appendChild(closeBtn);

        // 创建内容区域 (Content)
        const content = document.createElement('div');
        content.className = 'bim-dialog-content';
        if (typeof this.options.content === 'string') {
            content.innerHTML = this.options.content;
        } else if (this.options.content instanceof HTMLElement) {
            content.appendChild(this.options.content);
        }

        el.appendChild(header);
        el.appendChild(content);

        // 如果允许缩放，创建缩放手柄
        if (this.options.resizable) {
            const resizeHandle = document.createElement('div');
            resizeHandle.className = 'bim-dialog-resize-handle';
            el.appendChild(resizeHandle);
        }

        // ==================== 事件拦截核心逻辑 ====================
        // 定义阻断逻辑：只阻止冒泡，不阻止捕获，也不阻止默认行为(除非显式阻止)
        const stopPropagation = (e: Event) => {
            e.stopPropagation();
        };

        // 现代浏览器和 3D 引擎 (Three.js/Cesium) 交互事件
        const events = [
            'click', 'dblclick', 'contextmenu', 'wheel',
            'mousedown', 'mouseup', 'mousemove',
            'touchstart', 'touchend', 'touchmove',
            'pointerdown', 'pointerup', 'pointermove', 'pointerenter', 'pointerleave', 'pointerover', 'pointerout'
        ];

        // 绑定监听器 (默认冒泡阶段)
        // 这样内部元素(如关闭按钮)先触发，然后冒泡到这里被拦截，不再传给地图
        events.forEach(eventType => {
            el.addEventListener(eventType, stopPropagation, { passive: false });
        });

        return el;
    }

    /**
     * 设置元素尺寸
     */
    private setSize(el: HTMLElement, width?: number | string, height?: number | string) {
        if (width !== undefined) {
            el.style.width = typeof width === 'number' ? `${width}px` : width;
        }
        if (height !== undefined) {
            el.style.height = typeof height === 'number' ? `${height}px` : height;
        }
    }

    /**
     * 初始化弹窗位置
     */
    private initPosition() {
        const pos = this.options.position;
        const elRect = this.element.getBoundingClientRect();

        // 计算相对父容器的定位
        let left = 0;
        let top = 0;

        const pW = this.container.clientWidth;
        const pH = this.container.clientHeight;
        const elW = elRect.width;
        const elH = elRect.height;

        if (typeof pos === 'object' && 'x' in pos) {
            left = pos.x;
            top = pos.y;
        } else {
            switch (pos) {
                case 'center':
                    left = (pW - elW) / 2;
                    top = (pH - elH) / 2;
                    break;
                case 'top-left': left = 0; top = 0; break;
                case 'top-center': left = (pW - elW) / 2; top = 0; break;
                case 'top-right': left = pW - elW; top = 0; break;
                case 'left-center': left = 0; top = (pH - elH) / 2; break;
                case 'right-center': left = pW - elW; top = (pH - elH) / 2; break;
                case 'bottom-left': left = 0; top = pH - elH; break;
                case 'bottom-center': left = (pW - elW) / 2; top = pH - elH; break;
                case 'bottom-right': left = pW - elW; top = pH - elH; break;
                default:
                    left = (pW - elW) / 2;
                    top = (pH - elH) / 2;
            }
        }

        left = Math.max(0, Math.min(left, pW - elW));
        top = Math.max(0, Math.min(top, pH - elH));

        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
    }

    /**
     * 初始化拖拽功能 (性能优化 + 解决粘手)
     */
    private initDrag() {
        let startX = 0;
        let startY = 0;
        let startLeft = 0;
        let startTop = 0;
        let containerW = 0;
        let containerH = 0;
        let elW = 0;
        let elH = 0;

        const onMouseDown = (e: MouseEvent) => {
            e.preventDefault(); // 阻止默认行为（如选中文本），非常重要，防止卡顿
            e.stopPropagation(); // 阻止传递给 Three.js

            startX = e.clientX;
            startY = e.clientY;
            startLeft = this.element.offsetLeft;
            startTop = this.element.offsetTop;

            // 缓存尺寸，减少 reflow
            containerW = this.container.clientWidth;
            containerH = this.container.clientHeight;
            elW = this.element.offsetWidth;
            elH = this.element.offsetHeight;

            // 关键：使用 capture: true
            // 确保即使 createDom 阻止了冒泡，document 也能在捕获阶段收到事件
            document.addEventListener('mousemove', onMouseMove, { capture: true });
            document.addEventListener('mouseup', onMouseUp, { capture: true });
        };

        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            // 节流优化：使用 requestAnimationFrame
            if (this.rafId) return;

            this.rafId = requestAnimationFrame(() => {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                let newLeft = startLeft + dx;
                let newTop = startTop + dy;

                const maxLeft = containerW - elW;
                const maxTop = containerH - elH;

                newLeft = Math.max(0, Math.min(newLeft, maxLeft));
                newTop = Math.max(0, Math.min(newTop, maxTop));

                this.element.style.left = `${newLeft}px`;
                this.element.style.top = `${newTop}px`;

                this.rafId = null;
            });
        };

        const onMouseUp = () => {
            if (this.rafId) {
                cancelAnimationFrame(this.rafId);
                this.rafId = null;
            }
            // 移除监听
            document.removeEventListener('mousemove', onMouseMove, { capture: true });
            document.removeEventListener('mouseup', onMouseUp, { capture: true });
        };

        this.header.addEventListener('mousedown', onMouseDown);
    }

    /**
     * 初始化缩放功能 (性能优化 + 解决粘手)
     */
    private initResize() {
        const handle = this.element.querySelector('.bim-dialog-resize-handle') as HTMLElement;
        if (!handle) return;

        let startX = 0;
        let startY = 0;
        let startW = 0;
        let startH = 0;

        const onMouseDown = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            startX = e.clientX;
            startY = e.clientY;
            startW = this.element.offsetWidth;
            startH = this.element.offsetHeight;

            // 关键：使用 capture: true
            document.addEventListener('mousemove', onMouseMove, { capture: true });
            document.addEventListener('mouseup', onMouseUp, { capture: true });
        };

        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (this.rafId) return;

            this.rafId = requestAnimationFrame(() => {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                const newW = Math.max(this.options.minWidth || 100, startW + dx);
                const newH = Math.max(this.options.minHeight || 50, startH + dy);

                this.element.style.width = `${newW}px`;
                this.element.style.height = `${newH}px`;

                this.rafId = null;
            });
        };

        const onMouseUp = () => {
            if (this.rafId) {
                cancelAnimationFrame(this.rafId);
                this.rafId = null;
            }
            document.removeEventListener('mousemove', onMouseMove, { capture: true });
            document.removeEventListener('mouseup', onMouseUp, { capture: true });
        };

        handle.addEventListener('mousedown', onMouseDown);
    }

    /**
     * 动态设置内容
     * @param content 内容元素或 HTML 字符串
     */
    public setContent(content: HTMLElement | string) {
        this.contentArea.innerHTML = '';
        if (typeof content === 'string') {
            this.contentArea.innerHTML = content;
        } else {
            this.contentArea.appendChild(content);
        }
    }

    /**
     * 关闭弹窗并销毁
     */
    public close() {
        if (this._isDestroyed) return;

        // 清理可能存在的动画帧，防止报错
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }

        if (this.unsubscribeTheme) {
            this.unsubscribeTheme();
            this.unsubscribeTheme = null;
        }
        if (this.unsubscribeLocale) {
            this.unsubscribeLocale();
            this.unsubscribeLocale = null;
        }
        this.element.remove();
        this._isDestroyed = true;
        if (this.options.onClose) {
            this.options.onClose();
        }
    }

    /**
     * 销毁组件 (接口实现)
     */
    public destroy() {
        this.close();
    }
}