import {
  replacePlaceholders,
  getT,
} from '../src/utils';

const messages = {
  test: 'Hello World',
  'ns:test2': 'Hello Universe',
  jsx: 'Hello {something}! Have a good day!',
  jsx2: 'Hello{break}There!',
};

describe('i18n/utils', () => {
  describe('replacePlaceholders', () => {
    it('returns unchanged text when key-value pairs object is empty', () => {
      expect(replacePlaceholders('test', {})).toEqual('test');
    });

    it('returns unchanged text with placeholders when key-value pairs object does not contain proper replacements', () => {
      expect(replacePlaceholders('Hello {name}!', { something: 'test' })).toEqual('Hello {name}!');
    });

    it('returns text with placeholder replaced by provided key-value pair', () => {
      expect(replacePlaceholders('Hello {name}!', { name: 'You' })).toEqual('Hello You!');
    });

    it('returns text with multiple placeholders replaced by provided key-value pairs', () => {
      expect(replacePlaceholders('Hello {name}! Today is {day}.', { name: 'You', day: 'Monday' })).toEqual(
        'Hello You! Today is Monday.',
      );
    });
  });

  describe('getT', () => {
    it('returns translation key when translation was not found', () => {
      const t = getT(messages);
      expect(t('some.key')).toEqual('some.key');
      expect(t('ns:some.key')).toEqual('ns:some.key');
    });

    it('returns proper translations', () => {
      const t = getT(messages);

      expect(t('test')).toEqual('Hello World');
      expect(t('ns:test2')).toEqual('Hello Universe');
      expect(t('test2')).toEqual('test2');
    });

    it('returns proper translations when global namespace was provided', () => {
      const t = getT(messages, 'ns');

      expect(t('test')).toEqual('Hello World');
      expect(t('test2')).toEqual('Hello Universe');
      expect(t('ns:test2')).toEqual('Hello Universe');
    });
  });
});
