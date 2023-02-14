module.exports = {
  extends: ['../../.eslintrc.js'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['!**/*', 'dist/*'],
  rules: {
    'no-console': 'off',
    'no-restricted-syntax': 'off',
  },
};
