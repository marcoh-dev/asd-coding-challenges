/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				background: { DEFAULT: "#F3F2EE", dark: "#242831" },
				surface: { DEFAULT: "#EAE8E2", dark: "#303642" },
				text: { DEFAULT: "#2B2923", dark: "#E8EAF0" },
				"text-secondary": { DEFAULT: "#69655E", dark: "#B5BBC6" },
				primary: { DEFAULT: "#2866BB", dark: "#6EA2EA" },
				"status-alive": { DEFAULT: "#2E7D32", dark: "#66BB6A" },
				"status-dead": { DEFAULT: "#C62828", dark: "#EF5350" },
				border: { DEFAULT: "#DFDBD5", dark: "#48515F" },
			},
		},
	},
	plugins: [],
};
