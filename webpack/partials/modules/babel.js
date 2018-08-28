import installPackages from '../../installPackages';

import partial from '../partial';
import paths from '../../paths';

const babel = (options = {}) => {
  return config => {
    return partial(
      {
        rule: {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: paths.modules,
        },
      },
      config,
    );
  };
};

export default babel;
