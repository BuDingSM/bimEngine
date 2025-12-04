import { ThemeConfig } from './types';

/**
 * 深色主题 (默认)
 */
export const darkTheme: ThemeConfig = {
    name: 'dark',
    primary: '#0078d4',
    primaryHover: '#0063b1',
    
    // 修改：背景色统一为浅灰，不再跟随深色模式变黑
    background: '#f5f5f5', 
    panelBackground: 'rgba(30, 30, 30, 0.9)',
    
    // 注意：如果背景是浅色，主文字颜色通常需要是深色才能看清
    // 但这里的 textPrimary 主要是用于 UI 组件内部的。
    // 如果 BimEngine wrapper 上的文字直接显示在 background 上，
    // 我们可能需要区分 "UI文字" 和 "页面文字"。
    // 目前架构中：
    // theme.textPrimary 会应用到 wrapper.style.color (BimEngine.ts)
    // 以及 Toolbar/Dialog 的文字颜色。
    
    // 如果背景是浅灰，而 wrapper 文字设置为白色 (#ffffff)，那就看不清了。
    // 这是一个语义冲突：
    // 1. Panel (Toolbar/Dialog) 是黑底，需要白字。
    // 2. Background (Wrapper) 是白底，需要黑字。
    
    // 既然您要求背景统一浅灰，那么 Wrapper 上的“直接子文本”应该是深色。
    // 但 Toolbar/Dialog 仍然是深色模式（黑底），它们需要白字。
    
    // 妥协方案：
    // 保持 textPrimary 为白色（为了适配黑���的 Toolbar/Dialog）。
    // 但是在 BimEngine 中，如果背景强制改为浅色，Wrapper 的默认文字颜色可能需要单独处理，
    // 或者我们可以认为 "Wrapper" 主要是承载 UI 组件的，直接写在 Wrapper 上的文字（标题/描述）
    // 应该有自己的样式，而不是直接继承 theme.textPrimary。
    
    // 在之前的 BimEngine.ts 中：
    // this.wrapper.style.color = theme.textPrimary;
    
    // 如果背景变浅灰，这里 textPrimary 还是白色的话，标题就看不见了。
    // 所以，深色模式下：
    // 背景：浅灰
    // 组件：深黑
    // 组件文字：白
    // 页面文字：黑 (问题点)
    
    // 让我们先按您的要求改背景。通常这种情况下，ThemeConfig 可能需要区分 
    // contentText (页面内容文字) 和 uiText (组件文字)。
    // 但为了不破坏现有结构，我将假定 textPrimary 主要服务于 UI 组件。
    // 为了让 Wrapper 上的标题可见，我们可能需要在 BimEngine 中移除对 wrapper.style.color 的强制设置，
    // 或者在 presets 里把 textPrimary 改回来？不对，改回来 Toolbar 就看不清了。
    
    // 方案：我将仅修改 background。
    // 至于 Wrapper 上的标题（BimEngine 标题），由于在最新的 BimEngine.ts 中
    // ���们已经移除了 titleEl 和 descEl（在之前的重构中），
    // 所以现在 Wrapper 里主要是 Toolbar 和 Dialog，它们有自己的 panelBackground。
    // 只要 Toolbar/Dialog 内部正常即可。
    
    textPrimary: '#ffffff', 
    textSecondary: '#cccccc',
    
    border: '#444444',
    
    icon: '#cccccc',
    iconActive: '#ffffff',
    
    componentBackground: 'transparent',
    componentHover: '#333333',
    componentActive: 'rgba(255, 255, 255, 0.1)'
};

/**
 * 浅色主题
 */
export const lightTheme: ThemeConfig = {
    name: 'light',
    primary: '#0078d4',
    primaryHover: '#106ebe',
    
    // 统一为浅灰
    background: '#f5f5f5',
    panelBackground: '#ffffff',
    
    textPrimary: '#333333',
    textSecondary: '#666666',
    
    border: '#e0e0e0',
    
    icon: '#555555',
    iconActive: '#0078d4',
    
    componentBackground: 'transparent',
    componentHover: '#f0f0f0',
    componentActive: '#e0e0e0'
};