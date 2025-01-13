const path = require("path");
const { DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = function getConfig(baseDir, port) {
  const isProd = process.env.NODE_ENV === "production";

  /** @type {import('webpack').Configuration} */
  const config = {
    devtool: isProd ? false : "inline-source-map",
    output: {
      filename: isProd ? "[name].bundle.[contenthash:8].js" : "[name].bundle.js",
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          exclude: /node_modules/,
          // https://babeljs.io/docs/en/config-files#root-babelconfigjson-file
          use: {
            loader: "babel-loader",
            options: {
              rootMode: "upward"
            }
          }
        },
        // https://stackoverflow.com/a/68273109/6277806
        {
          test: /\.s?css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: !isProd
              }
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  ident: "postcss",
                  plugins: [autoprefixer()]
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
                sourceMap: !isProd
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource"
        },
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
    },
    plugins: [
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
      new CopyPlugin({
        patterns: [
          "public/favicon.ico",
          "public/logo192.png",
          "public/logo512.png",
          "public/manifest.json",
          "public/robots.txt"
        ]
      })
    ],
    optimization: {
      // https://blog.csdn.net/weixin_42349568/article/details/124229170
      nodeEnv: false,
      runtimeChunk: "single"
    }
  };

  const HtmlWebpackPluginConfig = {
    template: path.resolve(baseDir, "public/index.html")
  };

  if (isProd) {
    config.plugins.push(new HtmlWebpackPlugin(
      Object.assign({
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }, HtmlWebpackPluginConfig)
    ));
    config.plugins.push(new MiniCssExtractPlugin({
      filename: "main.[contenthash:8].css"
    }));
    config.optimization.splitChunks = {
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
  } else {
    config.plugins.push(new HtmlWebpackPlugin(HtmlWebpackPluginConfig));
    config.devServer = {
      host: '0.0.0.0',
      port,
      static: path.resolve(baseDir, "dist"),
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      hot: true
    };
    config.watchOptions = {
      ignored: /node_modules/,
      aggregateTimeout: 500, // delay before reloading
      poll: 1000 // enable polling since fsevents are not supported in docker
    };
  }

  return config;
};
