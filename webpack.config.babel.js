import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';

const webpackConfiguration = (_, { mode }) => ({
  entry: path.resolve('src', 'index.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
  },
  // Configures Loaders
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.(post)?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  // Configures Plugins
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.html'),
      meta: [
        {
          name: 'description',
          content:
            'Aki Gao is a software engineer with expertise in front-end, UX/UI and digital accessibility democratizing the Web at User1st.',
        },
        { name: 'author', content: 'Aki Gao' },
        {
          name: 'viewport',
          content: 'width=device-width, height=device-height, initial-scale=1',
        },
      ],
      minify:
        mode === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            }
          : false,
      hash: mode === 'production',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  // Configures Optimizations
  optimization:
    process.env.NODE_ENV === 'production'
      ? {
          minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCssAssetsWebpackPlugin({}),
          ],
        }
      : {},
  //Configures Webpack DevServer
  devServer: {
    port: 8080,
    // Enables webpack's Hot Module Replacement feature.
    hot: true,
    // Shows a full-screen overlay in the browser when there are compiler errors or warnings. Disabled by default.
    overlay: {
      warnings: true,
      errors: true,
    },
    // Sets and watches the content base so that dev server will reload page on HTML changes
    contentBase: path.resolve('src'),
    watchContentBase: true,
    // Opens default browser when dev server i ran
    open: true,
  },
});

export default webpackConfiguration;
