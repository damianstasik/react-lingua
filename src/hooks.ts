import { useContext } from 'react';
import { I18nContext } from './context';
import { getT } from './utils';

export const useTranslation = (namespace?: string) => {
  const { locale, translations, setLocale } = useContext(I18nContext);
  const t = getT(translations, namespace);

  return {
    locale,
    setLocale,
    t,
  };
};
