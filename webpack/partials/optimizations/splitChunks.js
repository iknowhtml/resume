import partial from '../partial';

const splitChunks = () => config =>
  partial(
    {
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all',
            },
          },
        },
      },
    },
    config,
  );

export default splitChunks;
