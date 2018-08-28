const fs = require('fs');

const packageJson = require('../package.json');

console.log('adding Webpack scripts...');
packageJson.scripts = {
  start:
    'NODE_PATH=$(pwd) nodemon --watch webpack.config.babel.js --watch webpack --exec "webpack-dev-server --mode development --env.NODE_ENV=development"',
  build:
    'yarn clean && webpack --progress --colors --mode production --env.NODE_ENV=production',
  clean: 'rm -rf dist',
};
fs.unlinkSync('../package.json');
fs.writeFileSync('../package.json', JSON.stringify(packageJson));

console.log('Webpack scripts added!');
