let config = {
  "presets": ["@babel/preset-env"],
}
function babelConfig (api) {
  api.cache(true);
  const presets = config.presets;
  const plugins = config.plugins;
  return {
    ignore: [],
    presets,
    plugins
  };
}

export default babelConfig;