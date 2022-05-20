const jsConfig = require("./jsconfig.json");
const { getAliases } = require("./config/aliases");

const OFF = "off";
const ERROR = "error";
const ALWAYS = "always";

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
    "jest/globals": true,
  },
  parser: "@babel/eslint-parser",
  extends: [
    // "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:import/recommended",
    "plugin:css-modules/recommended",
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended",
  ],
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    requireConfigFile: false,
  },
  rules: {
    quotes: [OFF],
    eqeqeq: [ERROR, ALWAYS],
    "no-eval": [ERROR],
    "prefer-const": [ERROR],
    "prettier/prettier": ERROR,
    "css-modules/no-unused-class": [OFF, { camelCase: true }],
    "css-modules/no-undef-class": [ERROR, { camelCase: true }],
    "react/react-in-jsx-scope": [OFF],
  },
  settings: {
    "import/ignore": [".(scss|css)$"],
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src"],
      },
      alias: {
        map: getAliases({ config: jsConfig, format: "eslint" }),
      },
    },
    react: {
      version: "detect",
    },
  },
  plugins: ["import", "prettier", "react", "jest", "css-modules"],
};
