export const lightTheme = {
	background: "#F3F2EE",
	surface: "#EAE8E2",
	text: "#2B2923",
	textSecondary: "#69655E",
	primary: "#2A6CC6",
	statusAlive: "#2E7D32",
	statusDead: "#C62828",
	border: "#DFDBD5",
};

export const darkTheme = {
	background: "#242831",
	surface: "#303642",
	text: "#E8EAF0",
	textSecondary: "#B5BBC6",
	primary: "#5E98E8",
	statusAlive: "#66BB6A",
	statusDead: "#EF5350",
	border: "#48515F",
};

export type AppTheme = typeof lightTheme;
export type ThemeMode = "system" | "light" | "dark";
