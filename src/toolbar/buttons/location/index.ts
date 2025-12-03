import type { ButtonConfig } from '../../index.type';

/**
 * 定位按钮配置
 */
export const locationButton: ButtonConfig = {
    id: 'location',
    groupId: 'group-1',
    type: 'button',
    label: '定位',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9 13h2v-2.75h2V13h2V8.25l-3-2l-3 2zm3 9q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22"/></svg>',
    keepActive: false,
    onClick: (button) => {
        console.log('定位按钮被点击:', button.id);
    }
};
