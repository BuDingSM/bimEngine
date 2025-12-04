import './bim-engine.css';
import { ToolbarManager } from './managers/toolbar-manager';
import { ButtonGroupManager } from './managers/button-group-manager';
import { DialogManager } from './managers/dialog-manager';
import { localeManager } from './services/locale';
import { themeManager } from './services/theme';
import type { LocaleType } from './locales/types';
import type { ThemeType, ThemeConfig } from './themes/types';

export class BimEngine {
    private container: HTMLElement;
    private wrapper: HTMLElement | null = null;
    private topLeftGroup: any = null; // 保存左上角按钮组的引用

    public toolbar: ToolbarManager | null = null;      // 底部专用
    public buttonGroup: ButtonGroupManager | null = null; // 通用
    public dialog: DialogManager | null = null;

    public get localeManager() { return localeManager; }
    public get themeManager() { return themeManager; }

    constructor(container: HTMLElement | string, options?: { locale?: LocaleType; theme?: ThemeType }) {
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

        // 初始化管理器
        this.dialog = new DialogManager(this.wrapper);
        this.toolbar = new ToolbarManager(this.wrapper);
        this.buttonGroup = new ButtonGroupManager(this.wrapper);

        // --- 创建左上角按钮组 (需求 1 & 2) ---
        this.createTopLeftGroup();

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

    private createTopLeftGroup() {
        if (!this.buttonGroup) return;

        this.topLeftGroup = this.buttonGroup.create({
            position: 'top-left',
            direction: 'column',
            align: 'vertical',
            backgroundColor: '#ff00ff', // 自定义背景色，不会被主题覆盖
            showLabel: false
        });

        this.topLeftGroup.addGroup('main');
        this.topLeftGroup.addButton({
            id: 'menu-btn',
            groupId: 'main',
            type: 'button',
            label: 'Menu', // 应该用 translation key
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',
            onClick: () => {
                alert("点击按钮")
            }
        });

        // 手动 render 一次以显示
        this.topLeftGroup.render();
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
        this.dialog = null;
        this.container.innerHTML = '';
    }
}
