import { TranslationDictionary } from './types';

export const zhCN: TranslationDictionary = {
  common: {
    title: 'BimEngine',
    description: '这是一个使用 BIM-ENGINE。',
    openTestDialog: '打开测试弹窗',
    openInfoDialog: '打开信息弹窗 (封装版)',
  },
  toolbar: {
    home: '首页',
    info: '信息',
    location: '定位',
    setting: '设置',
    walk: '漫游',
    walkPerson: '人视',
    walkBird: '鸟瞰',
    walkMenu: '菜单',
  },
  dialog: {
    testTitle: '测试弹窗',
    testContent: '<div style="padding: 10px;">这是一个 <b>可拖拽</b> 且 <b>可缩放</b> 的弹窗。<br><br>你可以尝试拖动标题栏，或者拖动右下角改变大小。</div>',
  },
};
