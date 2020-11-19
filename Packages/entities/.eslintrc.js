module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    "plugin:@typescript-eslint/recommended",
    'eslint:recommended',
    // Vue2 based plugins
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: [
    "vue",
    "@typescript-eslint"
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
