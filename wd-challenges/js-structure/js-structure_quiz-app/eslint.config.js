import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import globals from "globals";

export default [
  js.configs.recommended,
  jest.configs["flat/recommended"],
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
