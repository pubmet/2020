module.exports = {
  reportUnusedDisableDirectives: true,
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['import'],
  parserOptions: {
    ecmaVersion: 9,
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'no-prototype-builtins': 'off',
    'import/no-unresolved': ['error', { commonjs: true }],
  },
  overrides: [
    {
      files: 'src/scripts/**/*.js',
      parserOptions: {
        sourceType: 'module',
      },
      env: {
        browser: true,
      },
    },
  ],
}
