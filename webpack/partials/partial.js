const partial = (
  { rule, plugin, configuration = {}, optimization },
  config,
) => {
  return {
    ...config,
    module: {
      rules: rule
        ? [...((config.module && config.module.rules) || []), rule]
        : [...((config.module && config.module.rules) || [])],
    },
    plugins: plugin
      ? [...(config.plugins || []), plugin]
      : [...(config.plugins || [])],
    optimization: optimization
      ? { ...(config.optimization || {}), ...optimization }
      : { ...(config.optimization || {}) },
    ...configuration,
  };
};

export default partial;
