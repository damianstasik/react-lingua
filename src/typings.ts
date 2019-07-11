export type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

export type I18nContextProps = {
  initialLocale: string;
  translations: Translations;
  onChange?: (prevLocale: string, newLocale: string) => void;
};

export type I18nContextValue = {
  locale: string;
  setLocale: (value: string) => void;
  translations: {
    [key: string]: string;
  };
};

export type PlaceholderValues = {
  [key: string]: string;
};

export type I18nProps = {
  id: string;
  values?: {
    [key: string]: JSX.Element;
  };
};
