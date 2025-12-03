import type { ButtonConfig } from '../../index.type';

/**
 * 首页按钮配置
 */
export const homeButton: ButtonConfig = {
    id: 'home',
    groupId: 'group-1',
    type: 'button',
    label: '首页',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z"/></svg>',
    keepActive: true,
    onClick: (button) => {
        console.log('首页按钮被点击:', button.id);
    }
};
