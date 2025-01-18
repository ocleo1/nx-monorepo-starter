const path = require("node:path");
const { merge } = require('webpack-merge');
const { composePlugins, withNx } = require('@nx/webpack');
const getConfig = require("../../webpack.base");


const base = getConfig(__dirname);

/**
 * https://nx.dev/recipes/webpack/webpack-config-setup#nxenhanced-configuration-with-composable-plugins
 * @type {import('webpack').Configuration}
 */
module.exports = composePlugins(
  // Default Nx composable plugin
  withNx(),
  // Custom composable plugin
  (config) => {
    // `config` is the Webpack configuration object
    // customize configuration here
    const customConfig = merge(
      base,
      // project specific
      {
        entry: {
          world: './src/App.tsx'
        },
        output: {
          path: config.output.path
        },
        resolve: {
          alias: {
            "@/components": path.resolve(__dirname, 'src/components/'),
            "@/utils": path.resolve(__dirname, 'src/utils.ts')
          }
        }
      }
    );
    return { ...config, ...customConfig };
  }
);
