const config = require("../../tailwind.base");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: [
    "../../node_modules/@example-lib/foo/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ]
};
