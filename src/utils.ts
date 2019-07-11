import { PlaceholderValues } from './typings';

export const replacePlaceholders = (
  text: string,
  keyValuePairs: PlaceholderValues,
): string => Object
  .entries(keyValuePairs)
  .reduce((result, [key, value]) => result.replace(`{${key}}`, value), text);

export const getTranslationId = (
  id: string,
  translations: { [key: string]: string },
  namespace?: string,
): string => {
  let translationId: string = id;
  const namespacedId = `${namespace}:${id}`;

  if (namespace && translations[namespacedId]) {
    translationId = namespacedId;
  }

  return translationId;
};

export const getT = (translations: { [key: string]: string }, namespace?: string) => (
  id: any,
  placeholderValues?: PlaceholderValues,
): string => {
  const translationId = getTranslationId(id, translations, namespace);
  const translation = translations[translationId];

  if (!translation) {
    return translationId;
  }

  return placeholderValues ? replacePlaceholders(translation, placeholderValues) : translation;
};
