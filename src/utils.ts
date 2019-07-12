type PlaceholderValues = {
  [key: string]: string;
};

export const replacePlaceholders = (
  text: string,
  keyValuePairs: PlaceholderValues,
): string => Object
  .entries(keyValuePairs)
  .reduce((result, [key, value]) => result.replace(`{${key}}`, value), text);

export const getT = (translations: { [key: string]: string }, namespace?: string) => (
  id: any,
  placeholderValues?: PlaceholderValues,
): string => {
  let translationId: string = id;
  const namespacedId = `${namespace}:${id}`;

  if (namespace && translations[namespacedId]) {
    translationId = namespacedId;
  }

  const translation = translations[translationId];

  if (!translation) {
    return translationId;
  }

  return placeholderValues ? replacePlaceholders(translation, placeholderValues) : translation;
};
