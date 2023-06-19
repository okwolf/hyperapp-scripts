#!/usr/bin/env node

const nodePath = require("path");
const get = prop => value => value[prop];
const flatten = (others, next) => others.concat(next);
const getLoadersFromRules = (rules, path, loaderName) =>
  rules
    .filter(get(path))
    .map(get(path))
    .reduce(flatten, [])
    .filter(get("loader"))
    .filter(({ loader }) => loader.includes(loaderName));
const getRulesByTest = (rules, path, testPart) =>
  rules
    .filter(get(path))
    .map(get(path))
    .reduce(flatten, [])
    .filter(get("test"))
    .filter(({ test }) => test.toString().includes(testPart));

const script = process.argv[2] || "start";
if (script === "eject") {
  throw new Error("eject not supported");
}
process.env.NODE_ENV = script === "build" ? "production" : "development";

const webpackConfigPath = "react-scripts/config/webpack.config";
const createJestConfigPath = "react-scripts/scripts/utils/createJestConfig";

// load original configs
const webpackConfig = require(webpackConfigPath)(process.env.NODE_ENV);
if (!webpackConfig) {
  throw new Error(`no Webpack config found for: ${webpackConfigPath}`);
}

webpackConfig.plugins = (webpackConfig.plugins || []).filter(
  plugin => !(plugin?.constructor?.name || "").toLowerCase().includes("react")
);
const { module: { rules = [] } = {} } = webpackConfig;

// use for unminified prod builds
// webpackConfig.optimization.minimize = false;

const svgRules = getRulesByTest(rules, "oneOf", ".svg");
if (!svgRules.length) {
  throw new Error(`missing SVG rules in webpack config: ${webpackConfigPath}`);
}
// this rule brings in a copy of react
svgRules[0].use = svgRules[0].use.filter(
  ruleUse => !ruleUse.loader.includes("@svgr")
);

const babelLoaders = getLoadersFromRules(rules, "oneOf", "babel");
if (!babelLoaders.length) {
  throw new Error(
    `missing Babel config in webpack config: ${webpackConfigPath}`
  );
}
const babelOptions = babelLoaders[0].options;

// disable babel caching for testing
// babelOptions.cacheDirectory = false;

// configure babel to allow using JSX with Hyperapp
babelOptions.plugins = [
  [
    "@babel/transform-react-jsx",
    {
      runtime: "automatic",
      importSource: "hyperapp-scripts",
      useBuiltIns: true
    }
  ]
];

if (script === "start") {
  // transpile hyperapp so we can patch it for HMR
  babelLoaders[0].include = [
    babelLoaders[0].include,
    nodePath.join(
      nodePath.parse(babelLoaders[0].include).dir,
      "node_modules",
      "hyperapp"
    )
  ];
  babelOptions.plugins.push(require.resolve("./hyperappHMR"));
}

// override config in cache
require.cache[require.resolve(webpackConfigPath)].exports = () => webpackConfig;

const createJestConfig = require(createJestConfigPath);
require.cache[require.resolve(createJestConfigPath)].exports = (...args) => {
  const jestConfig = createJestConfig(...args);
  jestConfig.transformIgnorePatterns = jestConfig.transformIgnorePatterns.map(
    pattern =>
      pattern.includes("node_modules") ? "/node_modules/(?!hyperapp)/" : pattern
  );
  return jestConfig;
};

// call original react script
require(`react-scripts/scripts/${script}.js`);
