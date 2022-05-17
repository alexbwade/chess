const isTest = process.env.NODE_ENV === "test";

const config = { presets: [] };

if (isTest) {
  config.presets = [["@babel/preset-env"], ["@babel/preset-react", { runtime: "automatic" }]];
} else {
  config.presets = ["next/babel"];
}

module.exports = config;
