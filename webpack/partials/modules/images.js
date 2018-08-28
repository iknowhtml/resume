import installPackages from '../../installPackages';

import partial from '../partial';

installPackages('file-loader');

/**
Webpack module partial for loading images into build.

example options:
{
  include: './src'
  exclude: './node_modules'
}
**/
const images = (options = {}) => config =>
  partial(
    {
      rule: {
        test: /\.(png|svg|pg|gif)$/,
        use: 'file-loader',
      },
    },
    config,
  );

export default images;
