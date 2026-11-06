import { StyleSheet } from "react-native";

import type { AppTheme } from "./themes";

export const createStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 20,
			backgroundColor: theme.background,
		},

		logo: {
			width: "100%",
			aspectRatio: 1280 / 391,
			marginTop: 24,
			marginBottom: 16,
		},

		link: {
			color: theme.primary,
			textDecorationLine: "underline",
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

		paragraphs: {
			gap: 12,
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

		scrollTopButton: {
			position: "absolute",
			right: 0,
			bottom: 16,
			width: 48,
			height: 48,
			borderRadius: 24,
			backgroundColor: theme.primary,
			shadowColor: "#000000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 4,
		},

		scrollTopPressable: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
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

		pressed: {
			opacity: 0.7,
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

		detailsContent: {
			padding: 20,
			gap: 16,
		},

		detailsImage: {
			width: "100%",
			aspectRatio: 1,
			borderRadius: 12,
		},

		detailsHeading: {
			gap: 6,
		},

		detailsName: {
			fontSize: 24,
			fontWeight: "bold",
			color: theme.text,
		},

		detailsList: {
			backgroundColor: theme.surface,
			borderColor: theme.border,
			borderWidth: 1,
			borderRadius: 12,
			paddingHorizontal: 16,
			paddingVertical: 4,
		},

		detailRow: {
			flexDirection: "row",
			justifyContent: "space-between",
			gap: 16,
			paddingVertical: 10,
		},

		detailLabel: {
			fontSize: 16,
			color: theme.textSecondary,
		},

		detailValue: {
			flexShrink: 1,
			fontSize: 16,
			color: theme.text,
			textAlign: "right",
		},

		optionSelector: {
			flexDirection: "row",
			gap: 8,
			marginTop: 12,
			padding: 8,
			backgroundColor: theme.background,
			borderRadius: 12,
			borderWidth: 1,
			borderColor: theme.border,
		},

		optionButton: {
			flex: 1,
			minHeight: 44,
			paddingHorizontal: 8,
			borderRadius: 4,
			alignItems: "center",
			justifyContent: "center",
		},

		optionText: {
			fontSize: 15,
			fontWeight: "600",
		},
	});
