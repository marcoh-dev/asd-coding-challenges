import { StyleSheet } from "react-native";

import type { AppTheme } from "./themes";

export const createStyles = (theme: AppTheme) =>
	StyleSheet.create({
		screen: {
			flex: 1,
			backgroundColor: theme.background,
		},

		scrollView: {
			flex: 1,
		},

		container: {
			flex: 1,
			paddingHorizontal: 20,
			backgroundColor: theme.background,
		},

		header: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingVertical: 16,
		},

		headerTitle: {
			fontSize: 22,
			fontWeight: "bold",
			color: theme.text,
		},

		card: {
			backgroundColor: theme.surface,
			borderColor: theme.border,
			borderWidth: 1,
			borderRadius: 12,
			padding: 16,
			marginBottom: 16,
		},

		cardTitle: {
			fontSize: 18,
			fontWeight: "600",
			color: theme.text,
			marginBottom: 12,
		},

		text: {
			fontSize: 16,
			lineHeight: 24,
			color: theme.text,
		},

		drawerOverlay: {
			flex: 1,
			flexDirection: "row",
			backgroundColor: "rgba(0,0,0,0.5)",
		},

		drawerBackdrop: {
			flex: 1,
		},

		drawer: {
			width: 280,
			padding: 20,
			backgroundColor: theme.drawer,
			borderLeftWidth: 1,
			borderLeftColor: theme.drawerBorder,

			shadowColor: "#000000",
			shadowOffset: {
				width: -4,
				height: 0,
			},
			shadowOpacity: 0.3,
			shadowRadius: 12,
			elevation: 12,
		},

		drawerHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: 24,
		},

		drawerTitle: {
			fontSize: 22,
			fontWeight: "bold",
			color: theme.text,
		},

		menuItemText: {
			fontSize: 16,
			fontWeight: "600",
			color: theme.text,
		},

		themeSelector: {
			flexDirection: "row",
			justifyContent: "space-around",
			marginTop: 12,
			padding: 8,
			backgroundColor: theme.background,
			borderRadius: 12,
			borderWidth: 1,
			borderColor: theme.border,
		},

		themeButton: {
			padding: 12,
			borderRadius: 4,
			alignItems: "center",
			justifyContent: "center",
		},
	});
