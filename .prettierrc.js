const config = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['^@apps/(.*)$', '^@core-(.*)$', '^[./]'],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
