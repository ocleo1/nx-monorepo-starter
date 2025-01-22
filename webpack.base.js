const path = require("node:path");
const { DefinePlugin } = require("webpack");
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


const isProd = process.env.NODE_ENV === "production";

/** @type {import('webpack').Configuration} */
const common = {
  output: {
    // without it, bundle path in index.html is `<script src="hello.bundle.js"></script>`
    // when visits `/foo/one`, dev server will request `/foo/hello.bundle.js`
    // 404 occurs
    publicPath: "/",
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
      {
        test: /\.css$/i,
        use: [
          ...getCommonCssConfig(),
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          ...getCommonCssConfig(),
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

/** @type {import('webpack').Configuration} */
const prod = {
  mode: "production",
  output: {
    filename: "[name].bundle.[contenthash:8].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.[contenthash:8].css"
    })
  ],
  optimization: {
    minimize: true,
    // https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
    minimizer: [
      `...`,
      new CssMinimizerPlugin()
    ],
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

/** @type {import('webpack').Configuration} */
const dev = {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "[name].bundle.js",
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500, // delay before reloading
    poll: 1000 // enable polling since fsevents are not supported in docker
  }
};

function getCommonCssConfig() {
  return [
    isProd ? MiniCssExtractPlugin.loader : "style-loader",
    {
      loader: "css-loader",
      options: {
        // https://stackoverflow.com/a/68273109/6277806
        importLoaders: 1,
        sourceMap: !isProd
      }
    }
  ];
}

module.exports = function getConfig(baseDir) {
  const htmlWebpackPluginOptions = {
    template: path.resolve(baseDir, "public/index.html")
  };
  if (isProd) {
    Object.assign(htmlWebpackPluginOptions, {
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
    });
  }

  /** @type {import('webpack').Configuration} */
  return merge(
    common,
    isProd ? prod : dev,
    {
      plugins: [new HtmlWebpackPlugin(htmlWebpackPluginOptions)]
    }
  );
};
