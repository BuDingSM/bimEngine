import { ThemeConfig } from '../themes/types';
import { darkTheme, lightTheme } from '../themes/presets';

type ThemeChangeListener = (theme: ThemeConfig) => void;

/**
 * 主题管理器 (单例)
 */
export class ThemeManager {
    private currentTheme: ThemeConfig = darkTheme;
    private listeners: ThemeChangeListener[] = [];

    constructor() {
        // 默认初始化
    }

    /**
     * 获取当前主题配置
     */
    public getTheme(): ThemeConfig {
        return this.currentTheme;
    }

    /**
     * 切换预设主题
     * @param themeName 'dark' | 'light'
     */
    public setTheme(themeName: 'dark' | 'light') {
        if (themeName === 'light') {
            this.applyTheme(lightTheme);
        } else {
            this.applyTheme(darkTheme);
        }
    }

    /**
     * 应用自定义主题配置
     * @param theme 配置对象
     */
    public setCustomTheme(theme: ThemeConfig) {
        this.applyTheme(theme);
    }

    /**
     * 内部应用主题逻辑
     */
    private applyTheme(theme: ThemeConfig) {
        this.currentTheme = theme;
        this.notifyListeners();
    }

    /**
     * 订阅主题变更
     */
    public subscribe(listener: ThemeChangeListener): () => void {
        this.listeners.push(listener);
        // 立即回调一次当前状态
        listener(this.currentTheme);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.currentTheme));
    }
}

// 导出单例
export const themeManager = new ThemeManager();