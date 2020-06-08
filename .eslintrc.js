module.exports = {
  extends: 'airbnb-typescript',
  env: {
    jest: true,
    browser: true,
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
