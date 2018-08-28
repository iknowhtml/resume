import installPackages from '../../installPackages';

import partial from '../partial';

const postCSS = (userOptions = {}) => {
  installPackages([
    'mini-css-extract-plugin',
    'style-loader',
    'css-loader',
    'postcss-loader',
    'postcss-import',
    'postcss-preset-env',
    'css-hot-loader',
  ]);

  return config => {
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const defaultOptions = {
      options: {},
      minimize: true,
    };

    const { options, minimize } = Object.assign(
      {},
      defaultOptions,
      userOptions,
    );

    const cssLoader = {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]',
        minimize,
      },
    };

    const postCSSLoader = {
      loader: 'postcss-loader',
      options: {
        indent: 'postcss',
        plugins: loader => [require('postcss-preset-env')()],
      },
    };

    const loaderList = [cssLoader, postCSSLoader];

    return partial(
      {
        rule: {
          test: /.css$/,
          use: ['css-hot-loader', MiniCssExtractPlugin.loader, ...loaderList],
        },
        plugin: new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
      },
      config,
    );
  };
};

export default postCSS;
