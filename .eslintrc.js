//@ts-check

module.exports = /** @type { import('eslint').Linter.Config } */ ({
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  // 指定 ESLint parser
  parser: '@typescript-eslint/parser',
  extends: [
    // 使用 @typescript-eslint/eslint-plugin 中推荐的规则
    'plugin:@typescript-eslint/recommended',
    // 使用 eslint-config-prettier 来禁止 @typescript-eslint/eslint-plugin 中那些和 prettier 冲突的规则
    'prettier/@typescript-eslint',
    // 确保下面这行配置是这个数组里的最后一行配置
    'plugin:prettier/recommended',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {varsIgnorePattern: '^(h|MODULE){1}$'}],
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaversion: 2015, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      tsx: true,
    },
  },
})
