const path = require("node:path");

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    // https://github.com/postcss/postcss-import
    'postcss-import': {},
    // https://tailwindcss.com/docs/using-with-preprocessors#nesting
    'tailwindcss/nesting': 'postcss-nested',
    tailwindcss: {
      config: path.resolve(__dirname, 'tailwind.config.js')
    },
    autoprefixer: {}
  }
};
