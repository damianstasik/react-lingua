import React, { createContext, useState, useMemo } from 'react';
import { I18nContextProps, I18nContextValue } from '.';

export const I18nContext = createContext({} as I18nContextValue);

export const I18nProvider: React.FunctionComponent<I18nContextProps> = (props) => {
  const { children, initialLocale, translations, onChange } = props;
  const [locale, setLocale] = useState(initialLocale);

  const value = {
    locale,
    translations: translations[locale],
    setLocale(newLocale: string) {
      setLocale(newLocale);

      if (onChange) {
        onChange(locale, newLocale);
      }
    },
  };

  const memoizedValue = useMemo(() => value, [value.locale]);

  return (
    <I18nContext.Provider value={memoizedValue}>
      {children}
    </I18nContext.Provider>
  );
};
