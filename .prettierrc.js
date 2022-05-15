/* istanbul ignore next */
module.exports = {
  bracketSpacing: true,
  printWidth: 120,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "es5",
  overrides: [
    {
      files: ["*.json"],
      options: {
        printWidth: 9999,
      },
    },
  ],
};
