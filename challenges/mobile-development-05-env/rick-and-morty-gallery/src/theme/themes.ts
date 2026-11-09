export const lightTheme = {
	background: "#F3F2EE",
	surface: "#EAE8E2",
	text: "#2B2923",
	textSecondary: "#69655E",
	textDisabled: "#ABA79F",
	primary: "#2866BB",
	statusAlive: "#2E7D32",
	statusDead: "#C62828",
	border: "#DFDBD5",
};

export const darkTheme = {
	background: "#242831",
	surface: "#303642",
	text: "#E8EAF0",
	textSecondary: "#B5BBC6",
	textDisabled: "#687181",
	primary: "#6EA2EA",
	statusAlive: "#66BB6A",
	statusDead: "#EF5350",
	border: "#48515F",
};

export type AppTheme = typeof lightTheme;

export const highContrastLightTheme: AppTheme = {
	background: "#FFFFFF",
	surface: "#F2F1EE",
	text: "#000000",
	textSecondary: "#3A3833",
	textDisabled: "#8C8880",
	primary: "#0B4A9C",
	statusAlive: "#1B5E20",
	statusDead: "#A31515",
	border: "#6E6A63",
};

export const highContrastDarkTheme: AppTheme = {
	background: "#000000",
	surface: "#15181E",
	text: "#FFFFFF",
	textSecondary: "#E1E4EA",
	textDisabled: "#7D8594",
	primary: "#A3C8FF",
	statusAlive: "#8BD48F",
	statusDead: "#FF8F87",
	border: "#A3ABB8",
};
export type ThemeMode = "system" | "light" | "dark";
