export const locales = ["en", "zh-CN", "ru", "ja"] as const;
export type Locale = (typeof locales)[number];
export const pages = ["", "download", "docs", "changelog", "privacy"] as const;
export const siteUrl = "https://acstride.com";
export const extensionRepo =
  "https://github.com/acstride-labs/acstride-vscode-extension";
export const organization = "https://github.com/acstride-labs";
export const localeNames: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
  ru: "Русский",
  ja: "日本語",
};
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
