import installPackages from '../../installPackages';

import partial from '../partial';

/**
Webpack plugin partial for loading Google fonts into build.
Sample Option:
{
  fonts: [
    {
      family: 'Raleway',
      variants: [
        'regular',
        'italic',
        '500',
        '500italic',
        '600',
        '600italic',
        '700',
        '700italic',
      ],
    },
  ],
}
**/

const googleFonts = options => {
  installPackages('google-fonts-webpack-plugin');
  return config => {
    const GoogleFontsPlugin = require('google-fonts-webpack-pluging');
    partial({ plugin: new GoogleFontsPlugin(options) }, config);
  };
};

export default googleFonts;
