/**
 * 翻译字典接口
 * 定义所有可用的翻译键值对结构，保证类型安全
 */
export interface TranslationDictionary {
  common: {
    title: string;
    description: string;
    openTestDialog: string;
    openInfoDialog: string;
  };
  toolbar: {
    home: string;
    info: string;
    location: string;
    setting: string;
    walk: string;
    walkPerson: string;
    walkBird: string;
    walkMenu: string;
  };
  dialog: {
    testTitle: string;
    testContent: string;
  };
}

/**
 * 语言代码类型
 */
export type LocaleType = 'zh-CN' | 'en-US';
