const autoprefixer = require("autoprefixer");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    hello: './src/App.tsx'
  },

  output: {
    publicPath: 'http://localhost:8080/'
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [autoprefixer()]
              }
            }
          },
          "sass-loader"
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        // https://babeljs.io/docs/en/config-files#root-babelconfigjson-file
        use: {
          loader: "babel-loader",
          options: {
            rootMode: "upward"
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html"
    })
  ],

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react-vendor"
        },
        reduxVendor: {
          test: /[\\/]node_modules[\\/](@reduxjs[\\/]toolkit|react-redux)[\\/]/,
          name: "redux-vendor"
        },
        utilityVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
          name: "utility-vendor"
        },
        vendor: {
          test: /[\\/]node_modules[\\/](!lodash)(!moment)(!moment-timezone)[\\/]/,
          name: "vendor"
        }
      }
    }
  }
};
