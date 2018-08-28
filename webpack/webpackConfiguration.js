const webpackConfiguration = (base, config) =>
  config.reduce((config, partial) => partial(config), base);

export default webpackConfiguration;
