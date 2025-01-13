const config = require("../../webpack.base");


/** @type {import('webpack').Configuration} */
module.exports = {
  ...config,
  entry: {
    hello: './src/App.tsx'
  }
};
