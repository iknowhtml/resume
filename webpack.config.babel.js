import { postCSS } from './webpack/partials/modules';
import { devServer } from './webpack/partials/configurations';

import webpackConfiguration from './webpack/webpackConfiguration';

const base = {
  output: {
    path: __dirname,
  },
};

export default ({ NODE_ENV }) => {
  const common = [
    postCSS(NODE_ENV === 'production' ? {} : { minimize: false }),
  ];
  const development = [hotModuleReplacement(), devServer()];
  const production = [splitChunks(), runtimeChunk()];

  const config =
    NODE_ENV === 'production'
      ? [...common, ...production]
      : [...common, ...development];

  return webpackConfiguration(base, config);
};
