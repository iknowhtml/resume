import paths from './webpack/paths';

import partial from './webpack/partials/partial';

import { postCSS } from './webpack/partials/modules';
import { devServer } from './webpack/partials/configurations';
import {htmlWebpack} from './webpack/partials/plugins';

import webpackConfiguration from './webpack/webpackConfiguration';

let s;

function reloadHtmlPlugin() {
  const cache = {};
  const plugin = {name: 'CustomHtmlReloadPlugin'};
  this.hooks.compilation.tap(plugin, compilation => {
    compilation.hooks.htmlWebpackPluginAfterEmit.tap(plugin, data => {
      const orig = cache[data.outputName];
      const html = data.html.source();
      // plugin seems to emit on any unrelated change?
      if (orig && orig !== html) {
        s.sockWrite(s.sockets, 'content-changed');
      };
      cache[data.outputName] = html
    });
  });
};

const base = {
  entry: `${paths.src}/style.postcss`,
  output: {
    path: paths.dist,
  },
};

export default ({ NODE_ENV }) => {
  const config = [
    htmlWebpack({
      title: "Aki Gao's Resume",
      template: `${paths.src}/index.html`,
    }),
    (config) => partial({plugin: reloadHtmlPlugin}, config),    
    postCSS(NODE_ENV === 'production' ? 
    {} : { filename: 'style.css', minimize: false }),
    devServer({
      contentBase: paths.src,
      watchContentBase: true,
      before(app, server){
        s = server;
      }
    }),
  ];

  return webpackConfiguration(base, config);
};
