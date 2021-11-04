module.exports = {
  parser: "@babel/eslint-parser",  
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended'],
  rules: {
    'prettier/prettier': ['error'],
    'no-console': 0,
    ''
    'comma-dangle': ['error', 'only-multiline'],
  },
  env: {
    es6: true,
    node: true,
    browser: true,
    mocha: true,
  },
};
