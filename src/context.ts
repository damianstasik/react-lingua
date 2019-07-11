import { useState } from 'react';
import createUseContext from 'constate';
import { I18nContextProps, I18nContextValue } from '.';

export const useI18NContext = createUseContext<I18nContextProps, I18nContextValue>(
  ({ initialLocale, translations, onChange }) => {
    const [locale, setLocale] = useState(initialLocale);

    return {
      locale,
      translations: translations[locale],
      setLocale(newLocale: string) {
        setLocale(newLocale);

        if (onChange) {
          onChange(locale, newLocale);
        }
      },
    };
  },
  value => [value.locale],
);

export const I18nProvider = useI18NContext.Provider;
export const I18nContext = useI18NContext.Context;
