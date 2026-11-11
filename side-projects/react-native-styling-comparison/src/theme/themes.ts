export const lightTheme = {
	background: "#F3F2EE",
	surface: "#EAE8E2",
	text: "#2B2923",
	textSecondary: "#69655E",
	primary: "#2866BB",
	statusAlive: "#2E7D32",
	statusDead: "#C62828",
	border: "#DFDBD5",
};

export const darkTheme: AppTheme = {
	background: "#242831",
	surface: "#303642",
	text: "#E8EAF0",
	textSecondary: "#B5BBC6",
	primary: "#6EA2EA",
	statusAlive: "#66BB6A",
	statusDead: "#EF5350",
	border: "#48515F",
};

export type AppTheme = typeof lightTheme;
