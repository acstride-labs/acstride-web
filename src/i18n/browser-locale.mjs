/** Match browser preferences in quality order, with English as the safe fallback.
 * @param {string | null | undefined} header
 * @returns {'en' | 'zh-CN' | 'ru' | 'ja'}
 */
export function browserLocale(header) {
  const preferences = (header || '').split(',').map((value, index) => {
    const [tag, ...parameters] = value.trim().split(';');
    const quality = parameters.find(parameter => parameter.trim().startsWith('q='));
    const weight = quality ? Number(quality.trim().slice(2)) : 1;
    return {tag: tag.toLowerCase(), weight, index};
  }).filter(({weight}) => Number.isFinite(weight) && weight > 0 && weight <= 1)
    .sort((a,b) => b.weight - a.weight || a.index - b.index);
  for (const {tag} of preferences) {
    const language = tag.split('-')[0];
    if (language === 'zh') return 'zh-CN';
    if (language === 'en' || language === 'ru' || language === 'ja') return language;
  }
  return 'en';
}
