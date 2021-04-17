module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    indent: [
      2,
      2,
      { 'MemberExpression': 0 }
    ],
    quotes: [
      2,
      'single'
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    semi: [
      2,
      'always'
    ],
    'no-trailing-spaces': [
      2,
      {
        skipBlankLines: false
      }
    ],
    eqeqeq: [
      2,
      'allow-null'
    ],
    'consistent-return': 2,
    curly: 2,
    'dot-location': [2, 'property'],
    'guard-for-in': 2,
    'no-extra-bind': 2,
    'no-unused-vars': 2,
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'always']
  }
};
