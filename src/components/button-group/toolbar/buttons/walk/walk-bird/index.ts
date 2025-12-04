import type { ButtonConfig } from '../../../../index.type';

export const walkBirdButton: ButtonConfig = {
    id: 'walk-bird',
    groupId: 'group-1',
    parentId: 'walk',
    align: 'vertical',
    type: 'button',
    label: 'toolbar.walkBird',
    icon: '<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9 22V8.775q-2.275-.6-3.637-2.512T4 2h2q0 2.075 1.338 3.538T10.75 7h2.5q.75 0 1.4.275t1.175.8L20.35 12.6l-1.4 1.4L15 10.05V22h-2v-6h-2v6zm3-16q-.825 0-1.412-.587T10 4t.588-1.412T12 2t1.413.588T14 4t-.587 1.413T12 6"/></svg>',
    onClick: (button) => {
        console.log('鸟瞰漫游被点击:', button.id);
    }
};
