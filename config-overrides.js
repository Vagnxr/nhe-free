const path = require('path');

module.exports = function override(config) {
  const resolve = {
    ...config.resolve,
    alias: {
      '@': path.resolve(__dirname, './src'),
      apis: path.resolve(__dirname, './src/apis'),
      components: path.resolve(__dirname, './src/components'),
      commons: path.resolve(__dirname, './src/components/commons'),
      containers: path.resolve(__dirname, './src/containers'),
      modules: path.resolve(__dirname, './src/modules'),
      router: path.resolve(__dirname, './src/router'),
      sagas: path.resolve(__dirname, './src/sagas'),
      store: path.resolve(__dirname, './src/store'),
      utils: path.resolve(__dirname, './src/utils'),
      theme: path.resolve(__dirname, './src/theme'),
      static: path.resolve(__dirname, './src/static'),
    },
  };

  return { ...config, resolve };
};
