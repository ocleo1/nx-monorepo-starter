const config = require("../../webpack.base");


/** @type {import('webpack').Configuration} */
module.exports = {
  ...config,
  entry: {
    world: './src/App.tsx'
  },
  output: {
    publicPath: 'http://localhost:8081/'
  },
  devServer: {
    ...config.devServer,
    port: 8081
  }
};
