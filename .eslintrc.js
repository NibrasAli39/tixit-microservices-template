const typescriptEslintPlugin = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = {
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      project: "./tsconfig.json",
    },
  },
  plugins: {
    "@typescript-eslint": typescriptEslintPlugin,
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  ignores: ["node_modules", "build"],
  files: ["*.ts", "*.tsx"],
};
