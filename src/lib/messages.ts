import en from '../../messages/en.json';
import zh from '../../messages/zh-CN.json';
import ru from '../../messages/ru.json';
import ja from '../../messages/ja.json';
import type {Locale} from './site';
export const catalogs = {en, 'zh-CN': zh, ru, ja};
export function getMessages(locale: Locale) { return catalogs[locale]; }
