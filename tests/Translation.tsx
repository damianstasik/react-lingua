import * as React from 'react';
import { shallow } from 'enzyme';
import { I18nProvider, Translation } from '../src';

const initialLocale = 'en-US';

const translations = {
  'en-US': {
    test: 'Hello World!',
    'someNamespace:test': 'Hello there!',
    jsx1: 'It {comp}!',
    jsx2: 'Hello{break}There!',
    jsx3: 'It {comp}! Super {comp2}',
  },
};

const providerProps = { initialLocale, translations };

describe('Trans', () => {
  it('renders simple translations', () => {
    const wrapper1 = shallow(
      <I18nProvider {...providerProps}>
        <Translation id="test" />
      </I18nProvider>,
    );

    expect(wrapper1.html()).toEqual('Hello World!');

    const wrapper2 = shallow(
      <I18nProvider {...providerProps}>
        <Translation id="someNamespace:test" />
      </I18nProvider>,
    );

    expect(wrapper2.html()).toEqual('Hello there!');
  });

  it('renders translation that contains component inside', () => {
    const wrapper = shallow(
      <I18nProvider {...providerProps}>
        <Translation
          id="jsx1"
          values={{
            comp: <strong>works</strong>,
          }}
        />
      </I18nProvider>,
    );

    expect(wrapper.html()).toEqual('It <strong>works</strong>!');
  });

  it('renders translation that contains two components inside', () => {
    const wrapper = shallow(
      <I18nProvider {...providerProps}>
        <Translation
          id="jsx3"
          values={{
            comp: <strong>works</strong>,
            comp2: <del>nice!</del>,
          }}
        />
      </I18nProvider>,
    );

    expect(wrapper.html()).toEqual('It <strong>works</strong>! Super <del>nice!</del>');
  });

  it('renders translation key when translation was not found', () => {
    const wrapper = shallow(
      <I18nProvider {...providerProps}>
        <Translation id="someKey" />
      </I18nProvider>,
    );

    expect(wrapper.html()).toEqual('someKey');
  });

  it('renders translation that has overriden new line placeholder by something else', () => {
    const wrapper = shallow(
      <I18nProvider {...providerProps}>
        <Translation
          id="jsx2"
          values={{
            break: <div />,
          }}
        />
      </I18nProvider>,
    );

    expect(wrapper.html()).toEqual('Hello<div></div>There!');
  });
});
