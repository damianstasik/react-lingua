import React, { Fragment } from 'react';
import { mount } from 'enzyme';
import { useTranslation } from '../src/hooks';
import { I18nProvider, I18nContextProps } from '../src/context';

const mountWithProvider = (App: React.FC, props: I18nContextProps) => mount(
  <I18nProvider {...props}>
    <App />
  </I18nProvider>,
);

describe('hooks', () => {
  describe('t', () => {
    it('returns correct translation', () => {
      const App = () => {
        const { locale } = useTranslation();
        return <Fragment>{locale}</Fragment>;
      };

      const wrapper = mountWithProvider(App, {
        initialLocale: 'en-US',
        translations: {},
      });

      expect(wrapper.text()).toEqual('en-US');
    });
  });

  describe('locale', () => {
    it('returns correct initial locale', () => {
      const App = () => {
        const { locale } = useTranslation();
        return <Fragment>{locale}</Fragment>;
      };

      const wrapper = mountWithProvider(App, {
        initialLocale: 'en-US',
        translations: {},
      });

      expect(wrapper.text()).toEqual('en-US');
    });
  });

  describe('setLocale', () => {
    it('correctly sets new locale and triggers onChange callback', () => {
      const App = () => {
        const { locale, setLocale } = useTranslation();
        setLocale('de-DE');
        return <Fragment>{locale}</Fragment>;
      };

      const onChange = jest.fn();

      const wrapper = mountWithProvider(App, {
        initialLocale: 'en-US',
        translations: {},
        onChange,
      });

      expect(wrapper.text()).toEqual('de-DE');
      expect(onChange).toHaveBeenCalledWith('en-US', 'de-DE');
    });
  });
});
