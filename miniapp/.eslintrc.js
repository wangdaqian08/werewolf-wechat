module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
  ],
  globals: {
    wx: true,
    App: true,
    Page: true,
    getApp: true,
    getCurrentPages: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
  },
};
