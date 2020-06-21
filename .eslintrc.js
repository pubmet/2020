module.exports = {
  reportUnusedDisableDirectives: true,
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 9,
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'no-prototype-builtins': 'off',
  },
  overrides: [
    {
      files: 'src/scripts/**/*.js',
      env: {
        browser: true,
      },
    },
  ],
}
