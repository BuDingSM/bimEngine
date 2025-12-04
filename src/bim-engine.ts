import './bim-engine.css';
import { ToolbarManager } from './managers/toolbar-manager';
import { ButtonGroupManager } from './managers/button-group-manager';
import { DialogManager } from './managers/dialog-manager';
import { EngineManager } from './managers/engine-manager';
import type { EngineOptions, ModelLoadOptions } from './components/engine';
import { localeManager } from './services/locale';
import { themeManager } from './services/theme';
import type { LocaleType } from './locales/types';
import type { ThemeType, ThemeConfig } from './themes/types';

export type { EngineOptions, ModelLoadOptions };



export class BimEngine {
    private container: HTMLElement;
    private wrapper: HTMLElement | null = null;
    private topLeftGroup: any = null; // 保存左上角按钮组的引用

    public toolbar: ToolbarManager | null = null;      // 底部专用
    public buttonGroup: ButtonGroupManager | null = null; // 通用
    public dialog: DialogManager | null = null;
    public engine: EngineManager | null = null;    // 3D 引擎管理器

    public get localeManager() { return localeManager; }
    public get themeManager() { return themeManager; }

    constructor(
        container: HTMLElement | string,
        options?: {
            locale?: LocaleType;
            theme?: ThemeType;
        }
    ) {
        const el = typeof container === 'string' ? document.getElementById(container) : container;
        if (!el) throw new Error('Container not found');
        this.container = el;

        if (options?.locale) localeManager.setLocale(options.locale);
        if (options?.theme) {
            if (options.theme === 'custom') {
                console.warn('Custom theme should be set via setCustomTheme().');
            } else {
                themeManager.setTheme(options.theme);
            }
        }

        this.init();
    }

    public setLocale(locale: LocaleType) { localeManager.setLocale(locale); }
    public getLocale(): LocaleType { return localeManager.getLocale(); }
    public setTheme(theme: 'dark' | 'light') { themeManager.setTheme(theme); }
    public setCustomTheme(theme: ThemeConfig) { themeManager.setCustomTheme(theme); }

    private init() {
        this.container.innerHTML = '';
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'bim-engine-wrapper';
        this.container.appendChild(this.wrapper);

        // 创建 3D 引擎管理器
        this.engine = new EngineManager(this.wrapper);

        // 初始化其他管理器
        this.dialog = new DialogManager(this.wrapper);
        this.toolbar = new ToolbarManager(this.wrapper);
        this.buttonGroup = new ButtonGroupManager(this.wrapper);


        // 初始主题
        this.updateTheme(themeManager.getTheme());

        // 在主题更新后，设置左上角按钮组的自定义颜色
        if (this.topLeftGroup) {
            this.topLeftGroup.setColors({
                backgroundColor: '#ff00ff'
            });
        }
        themeManager.subscribe((theme) => {
            this.updateTheme(theme);
        });
    }

    /**
     * 初始化 3D 引擎组件
     * 注意：只初始化引擎，不加载模型。模型加载在使用层（如 demo.html）进行
     * @param options 引擎配置选项（可选）
     */
    public initEngine(options?: Omit<EngineOptions, 'container'>): boolean {
        if (!this.engine) {
            console.error('[BimEngine] Engine manager not available.');
            return false;
        }

        // 调用 manager 的 initialize 方法初始化引擎
        return this.engine.initialize(options);
    }

    private updateTheme(theme: ThemeConfig) {

        if (this.wrapper) {
            this.wrapper.style.backgroundColor = theme.background;
            this.wrapper.style.color = theme.textPrimary;
        }
    }

    public destroy() {
        this.toolbar?.destroy();
        this.buttonGroup?.destroy();
        this.engine?.destroy();
        this.dialog = null;
        this.container.innerHTML = '';
    }
}
