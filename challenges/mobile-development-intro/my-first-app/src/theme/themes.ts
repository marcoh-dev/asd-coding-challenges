export const lightTheme = {
	background: "#F1F2F4",
	surface: "#E6E8EC",
	drawer: "#FAFAF8",
	listItem: "#ECEEF1",
	text: "#252932",
	textSecondary: "#707783",
	primary: "#3478D4",
	border: "#D9DCE2",
	drawerBorder: "#E0E2E5",
};

export const darkTheme = {
	background: "#242831",
	surface: "#303642",
	drawer: "#3A414E",
	listItem: "#2C323C",
	text: "#E8EAF0",
	textSecondary: "#B5BBC6",
	primary: "#5799F5",
	border: "#48515F",
	drawerBorder: "#535D6C",
};

export type AppTheme = typeof lightTheme;
export type ThemeMode = "system" | "light" | "dark";
