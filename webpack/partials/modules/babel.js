import installPackages from '../../installPackages';

import partial from '../partial';
import paths from '../../paths';

installPackages([	
  'babel-loader',	
  'babel-polyfill',	
  'babel-plugin-transform-object-rest-spread',	
  'babel-plugin-transform-class-properties',	
]);

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
