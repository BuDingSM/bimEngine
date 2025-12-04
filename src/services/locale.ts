import { LocaleType, TranslationDictionary } from '../locales/types';
import { zhCN } from '../locales/zh-CN';
import { enUS } from '../locales/en-US';

type LocaleChangeListener = (locale: LocaleType) => void;

/**
 * 语言管理器类
 */
export class LocaleManager {
  private currentLocale: LocaleType = 'zh-CN';
  private messages: Record<LocaleType, TranslationDictionary> = {
    'zh-CN': zhCN,
    'en-US': enUS,
  };
  private listeners: LocaleChangeListener[] = [];

  constructor() {
    // 默认初始化
  }

  /**
   * 获取当前语言
   */
  public getLocale(): LocaleType {
    return this.currentLocale;
  }

  /**
   * 切换语言
   */
  public setLocale(locale: LocaleType) {
    if (this.currentLocale === locale) return;
    this.currentLocale = locale;
    this.notifyListeners();
  }

  /**
   * 翻译核心方法
   */
  public t(key: string): string {
    if (!key) return '';
    
    const keys = key.split('.');
    let value: any = this.messages[this.currentLocale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value as string;
  }

  /**
   * 订阅变更
   */
  public subscribe(listener: LocaleChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentLocale));
  }
}

// --- 导出单例 ---
export const localeManager = new LocaleManager();

// --- 导出便捷方法 ---
/**
 * 全局翻译函数
 * @param key 键路径 (如 'toolbar.home')
 */
export const t = (key: string): string => localeManager.t(key);
