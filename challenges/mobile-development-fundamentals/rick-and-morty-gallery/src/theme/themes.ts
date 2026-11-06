export const lightTheme = {
	background: "#F3F2EE",
	surface: "#EAE8E2",
	drawer: "#FAF9F7",
	text: "#2B2923",
	textSecondary: "#69655E",
	primary: "#2A6CC6",
	border: "#DFDBD5",
	drawerBorder: "#E4E2DD",
};

export const darkTheme = {
	background: "#242831",
	surface: "#303642",
	drawer: "#3A414E",
	text: "#E8EAF0",
	textSecondary: "#B5BBC6",
	primary: "#5E98E8",
	border: "#48515F",
	drawerBorder: "#535D6C",
};

export type AppTheme = typeof lightTheme;
export type ThemeMode = "system" | "light" | "dark";
