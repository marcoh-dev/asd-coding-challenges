const path = require("node:path");

const nativewindFolder = path.join(__dirname, "src/styles/nativewind");

module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		overrides: [
			{
				test: (filename) => filename?.startsWith(nativewindFolder) ?? false,
				presets: [
					["babel-preset-expo", { jsxImportSource: "nativewind" }],
					"nativewind/babel",
				],
			},
		],
	};
};
