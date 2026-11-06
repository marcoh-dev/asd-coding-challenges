import { StyleSheet } from "react-native";

import type { AppTheme } from "./themes";

export const createStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 20,
			backgroundColor: theme.background,
		},

		card: {
			backgroundColor: theme.surface,
			borderColor: theme.border,
			borderWidth: 1,
			borderRadius: 12,
			padding: 16,
			marginVertical: 16,
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

		centered: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			gap: 16,
		},

		button: {
			backgroundColor: theme.primary,
			minHeight: 44,
			justifyContent: "center",
			paddingHorizontal: 20,
			borderRadius: 8,
		},

		buttonText: {
			color: theme.background,
			fontSize: 14,
			fontWeight: "600",
		},

		gallery: {
			flex: 1,
		},

		galleryContent: {
			gap: 12,
			paddingTop: 16,
			paddingBottom: 20,
		},

		galleryRow: {
			gap: 12,
		},

		galleryFooter: {
			alignItems: "center",
			gap: 12,
		},

		characterCard: {
			flex: 1,
			backgroundColor: theme.surface,
			borderColor: theme.border,
			borderWidth: 1,
			borderRadius: 12,
			overflow: "hidden",
		},

		characterImage: {
			width: "100%",
			aspectRatio: 1,
		},

		characterInfo: {
			padding: 10,
			gap: 4,
		},

		characterName: {
			fontSize: 16,
			fontWeight: "600",
			color: theme.text,
		},

		characterStatus: {
			flexDirection: "row",
			alignItems: "center",
			gap: 6,
		},

		statusDot: {
			width: 8,
			height: 8,
			borderRadius: 4,
		},

		characterDetail: {
			fontSize: 14,
			color: theme.textSecondary,
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
