const path = require("node:path");
const { merge } = require('webpack-merge');
const getConfig = require("../../webpack.base");


const base = getConfig(__dirname);

/** @type {import('webpack').Configuration} */
module.exports = merge(
  // base
  base,
  // project specific
  {
    entry: {
      world: './src/App.tsx'
    },
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, 'src/components/'),
        "@/utils": path.resolve(__dirname, 'src/utils.ts')
      }
    }
  },
  // environment specific
  process.env.NODE_ENV === "production"
    ? {}
    : {
      devServer: {
        port: 3101,
        static: path.resolve(__dirname, "dist")
      }
    }
);
