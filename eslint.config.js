import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import globals from "globals";

// https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#configuration-new-eslintconfigjs
const plugins = { react };

const languageOptions = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    },
    projectService: true
  },
  globals: {
      ...globals.browser,
      ...globals.es2015,
      ...globals.jest
  }
};

const rules = {
  "arrow-body-style": "off",
  "comma-dangle": ["error", "never"],
  "space-before-function-paren": ["error", {
    anonymous: "always",
    named: "never",
    asyncArrow: "always"
  }]
};

const settings = {
  react: {
    version: "detect"
  }
};

// https://typescript-eslint.io/packages/typescript-eslint/#usage-with-other-plugins
const tseslintConfigs = tseslint.configs.recommended.map((conf) => ({
  ...conf,
  files: ["**/*.{ts,tsx}"],
  plugins: {
    ...plugins,
    "@typescript-eslint": tseslint.plugin,
  },
  languageOptions: {
    ...languageOptions,
    parser: tseslint.parser
  },
  rules,
  settings
}))

export default [
  eslint.configs.recommended,
  ...tseslintConfigs,
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    // https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#configuration-new-eslintconfigjs
    plugins,
    languageOptions,
    ignores: ["*.md", ".css", ".scss", ".sass"],
    rules,
    settings
  }
];
