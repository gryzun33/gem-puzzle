module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'no-inner-declarations': 0,
    'operator-linebreak': 0,
    'import/no-unresolved': 0,
  },
};
