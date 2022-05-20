const FORMATS = {
  ESLINT: "eslint",
  JEST: "jest",
};

const getAliasedModules = (jsConfig) => {
  const entries = Object.entries(jsConfig.compilerOptions.paths);

  return entries.map(([alias, pathArray]) => {
    const path = pathArray[0];

    return [alias, path];
  });
};

const getAliasesEslint = (jsConfig) => {
  const modules = getAliasedModules(jsConfig);
  const aliases = [];

  for (const [alias, path] of modules) {
    const formattedAlias = alias.replace("/*", "");
    const formattedPath = path.replace("/*", "").replace("/index.js", "");

    aliases.push([formattedAlias, formattedPath]);
  }

  return aliases;
};

const getAliasesJest = (jsConfig) => {
  const modules = getAliasedModules(jsConfig);
  const aliases = {};

  for (const [alias, path] of modules) {
    const aliasSuffix = path.includes("index.js") ? "" : "(.*)$";
    const formattedAlias = `^${alias.replace("/*", aliasSuffix)}`;
    const formattedPath = path.replace("./", "<rootDir>/").replace("/*", "$1");

    aliases[formattedAlias] = formattedPath;
  }

  return aliases;
};

function getAliases({ format, config }) {
  if (!Object.values(FORMATS).includes(format)) {
    throw new Error("Invalid format passed to getAliases().");
  }

  const { ESLINT, JEST } = FORMATS;

  switch (format) {
    case ESLINT: {
      return getAliasesEslint(config);
    }
    case JEST: {
      return getAliasesJest(config);
    }
  }
}

module.exports = { getAliases };
