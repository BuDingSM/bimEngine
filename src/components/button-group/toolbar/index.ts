import { BimButtonGroup } from '../index';

/**
 * 底部工具栏 (Toolbar)
 * BimButtonGroup 的子类，专门用于加载工具栏默认按钮。
 */
export class Toolbar extends BimButtonGroup {
    /**
     * 重写初始化，加载默认按钮
     */
    public async init(): Promise<void> {
        await super.init();

        // 动态加载默认按钮配置
        const { homeButton } = await import('./buttons/home');
        const { locationButton } = await import('./buttons/location');
        const { walkMenuButton } = await import('./buttons/walk/walk-menu');
        const { walkPersonButton } = await import('./buttons/walk/walk-person');
        const { walkBirdButton } = await import('./buttons/walk/walk-bird');
        const { settingButton } = await import('./buttons/setting');
        const { infoButton } = await import('./buttons/info');

        this.addGroup('group-1');
        this.addButton(homeButton);
        this.addButton(walkMenuButton);
        this.addButton(walkPersonButton);
        this.addButton(walkBirdButton);
        this.addButton(locationButton);
        this.addGroup('group-2');
        this.addButton(settingButton);
        this.addButton(infoButton);

        this.render();
    }
}
