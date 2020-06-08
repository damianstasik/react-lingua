import * as React from 'react';
import { createContext, useState, useMemo } from 'react';

export type I18nContextProps = {
  initialLocale: string;
  translations: {
    [key: string]: {
      [key: string]: string;
    };
  };
  onChange?: (prevLocale: string, newLocale: string) => void;
};

export type I18nContextValue = {
  locale: string;
  setLocale: (value: string) => void;
  translations: {
    [key: string]: string;
  };
};

export const I18nContext = createContext({} as I18nContextValue);

export const I18nProvider: React.FunctionComponent<I18nContextProps> = (props) => {
  const {
    children, initialLocale, translations, onChange,
  } = props;

  const [locale, setLocale] = useState(initialLocale);

  const memoizedValue = useMemo(() => ({
    locale,
    translations: translations[locale],
    setLocale(newLocale: string) {
      setLocale(newLocale);

      if (onChange) {
        onChange(locale, newLocale);
      }
    },
  }), [locale]);

  return (
    <I18nContext.Provider value={memoizedValue}>
      {children}
    </I18nContext.Provider>
  );
};
