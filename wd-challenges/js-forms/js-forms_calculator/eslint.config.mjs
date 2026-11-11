import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import globals from "globals";

export default [
	js.configs.recommended,
	vitest.configs.recommended,
	vitest.configs.env,
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
