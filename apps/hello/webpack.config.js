const path = require("node:path");
const getConfig = require("../../webpack.base");


const config = getConfig(__dirname, 8080);

/** @type {import('webpack').Configuration} */
module.exports = {
  ...config,
  entry: {
    hello: './src/App.tsx'
  },
  resolve: {
    ...config.resolve,
    alias: {
      "@/components": path.resolve(__dirname, 'src/components/'),
      "@/utils": path.resolve(__dirname, 'src/utils.ts')
    }
  }
};
