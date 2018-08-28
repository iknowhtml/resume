# Webpack

Utilities for a modular Webpack configuration using functional programming paradigms.

### Example Configuration:

```javascript
import webpack from 'webpack';

import paths from './webpack/paths';

import { babel, fonts, postCSS } from './webpack/partials/modules';
import { htmlWebpack, hotModuleReplacement } from './webpack/partials/plugins';
import { devServer } from './webpack/partials/configurations';
import { splitChunks, runtimeChunk } from './webpack/partials/optimizations';

import webpackConfiguration from './webpack/webpackConfiguration';

const base = {
  entry: `${paths.src}/index.js`,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: paths.dist,
  },
};

export default ({ NODE_ENV }) => {
  const common = [
    babel(),
    fonts(),
    postCSS(NODE_ENV === 'production' ? {} : { minimize: false }),
    htmlWebpack(NODE_ENV === 'production' ? {} : { minify: false }),
  ];
  const development = [hotModuleReplacement(), devServer()];
  const production = [splitChunks(), runtimeChunk()];

  const config =
    NODE_ENV === 'production'
      ? [...common, ...production]
      : [...common, ...development];

  return webpackConfiguration(base, config);
};
```
