module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-empty-pattern': ['off'],
    'no-undef': ['error'],
    'no-var': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'no-unused-expressions': ['off'],
    indent: ['off'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
      },
    ],
  },
  env: {
    // change as necessary
    node: true,
    mocha: true,
    commonjs: true,
  },
};
