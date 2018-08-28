import partial from '../partial';

const runtimeChunk = () => config =>
  partial({ optimization: { runtimeChunk: { name: 'manifest' } } }, config);

export default runtimeChunk;
