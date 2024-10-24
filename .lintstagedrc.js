module.exports = {
  '*/**/*.{js,ts}': [() => 'pnpm type:check', 'pnpm format', 'pnpm lint'],
  '*/**/*.{json,md}': ['pnpm prettier --write'],
};
