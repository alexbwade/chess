// const { getAliases } = require("./config/aliases");

module.exports = {
  cacheDirectory: ".jest-cache",
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.js"],
  coverageDirectory: "<rootDir>/coverage/",
  coveragePathIgnorePatterns: [],
  coverageReporters: ["json-summary", "html"],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "json"],
  moduleNameMapper: {
    "\\.module.scss$": "identity-obj-proxy",
    "\\.scss$": "<rootDir>/config/jest/emptyStringMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/config/jest/emptyObjectMock.js",
    // module aliases
    "^~constants": "<rootDir>/constants/index.js",
    "^~hooks(.*)$": "<rootDir>/hooks$1",
    "^~utils(.*)$": "<rootDir>/utils$1",
    "^~styles(.*)$": "<rootDir>/sass$1",
    "^~widgets(.*)$": "<rootDir>/components/widgets$1",
    "^~elements(.*)$": "<rootDir>/components/elements$1",
    "^~partials(.*)$": "<rootDir>/components/partials$1",
    "^~templates(.*)$": "<rootDir>/components/templates$1",
  },
  reporters: ["default"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["<rootDir>/**/__tests__/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "\\.js?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!react-file-drop)"],
  verbose: true,
};
