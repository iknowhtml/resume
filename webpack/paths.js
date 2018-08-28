import path from 'path';

const root = process.env.NODE_PATH;

const paths = {
  src: path.join(root, 'src'),
  dist: path.join(root, 'dist'),
  modules: path.join(root, 'node_modules'),
};

export default paths;
