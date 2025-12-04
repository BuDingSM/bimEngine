/**
 * 全局主题配置接口
 * 定义系统通用的语义化颜色
 */
export interface ThemeConfig {
    /** 主题名称 */
    name: string;
    
    /** 品牌色/主色 */
    primary: string;
    /** 主色悬停/激活态 */
    primaryHover: string;

    /** 基础背景色 (应用整体背景) */
    background: string;
    /** 面板背景色 (工具栏、弹窗背景) */
    panelBackground: string;
    
    /** 主要文字颜色 */
    textPrimary: string;
    /** 次要文字颜色 */
    textSecondary: string;
    
    /** 边框/分割线颜色 */
    border: string;
    
    /** 图标默认颜色 */
    icon: string;
    /** 图标激活颜色 */
    iconActive: string;
    
    /** 交互组件背景 (如按钮默认背景) */
    componentBackground: string;
    /** 交互组件悬停背景 */
    componentHover: string;
    /** 交互组件激活背景 */
    componentActive: string;
}

/**
 * 主题类型定义
 */
export type ThemeType = 'dark' | 'light' | 'custom';
