/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588760768625_5601';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_x',
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  };

  config.jwt = {
    secret: 'my_secret',
    enable: true,
    match: /^\/api/, // optional
  };

  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: '接口文档',
      description: 'XXX 后端接口文档',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    enableSecurity: false,
    // enableValidate: true,
    routerMap: true,
    enable: true,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
