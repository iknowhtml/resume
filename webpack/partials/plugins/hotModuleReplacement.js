import webpack from 'webpack';

import partial from '../partial';

const hotModuleReplacement = (options = {}) => config =>
  partial({ plugin: new webpack.HotModuleReplacementPlugin(options) }, config);
export default hotModuleReplacement;
