import { Platform, StyleSheet } from "react-native";

import type { AppTheme } from "./themes";

const PILL_RADIUS = 999;

const fontWeights = {
	regular: { regular: "400", semibold: "600", bold: "700" },
	bold: { regular: "600", semibold: "700", bold: "800" },
} as const;

export const createStyles = (theme: AppTheme, boldText: boolean) => {
	const fontWeight = fontWeights[boldText ? "bold" : "regular"];

	return StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 16,
			backgroundColor: theme.background,
		},

		envError: {
			flexGrow: 1,
			justifyContent: "center",
		},

		envErrorMessage: {
			fontFamily: Platform.select({ ios: "Menlo", default: "monospace" }),
			fontSize: 14,
			fontWeight: fontWeight.regular,
			lineHeight: 20,
			color: theme.textSecondary,
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
			fontWeight: fontWeight.semibold,
			color: theme.text,
			marginBottom: 12,
		},

		paragraphs: {
			gap: 12,
		},

		text: {
			fontSize: 16,
			fontWeight: fontWeight.regular,
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
			borderRadius: PILL_RADIUS,
		},

		buttonText: {
			color: theme.background,
			fontSize: 14,
			fontWeight: fontWeight.semibold,
		},

		gallery: {
			flex: 1,
		},

		galleryCount: {
			marginVertical: 12,
			fontSize: 14,
			fontWeight: fontWeight.regular,
			color: theme.textSecondary,
		},

		galleryStale: {
			opacity: 0.5,
		},

		galleryDivider: {
			position: "absolute",
			top: 0,
			left: -16,
			right: -16,
			height: 1,
			backgroundColor: theme.border,
		},

		searchInput: {
			flexDirection: "row",
			alignItems: "center",
			gap: 8,
			marginTop: 16,
			paddingLeft: 12,
			backgroundColor: theme.surface,
			borderColor: theme.border,
			borderWidth: 1,
			borderRadius: 12,
		},

		searchInputText: {
			flex: 1,
			minHeight: 48,
			fontSize: 16,
			fontWeight: fontWeight.regular,
			color: theme.text,
		},

		searchClearButton: {
			width: 48,
			height: 48,
			alignItems: "center",
			justifyContent: "center",
		},

		galleryContent: {
			gap: 12,
			marginHorizontal: -6,
			paddingBottom: 20,
		},

		galleryItem: {
			flex: 1,
			paddingHorizontal: 6,
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
			paddingHorizontal: 6,
		},

		galleryLoading: {
			paddingTop: 32,
		},

		galleryError: {
			alignItems: "flex-start",
			gap: 16,
			paddingTop: 16,
		},

		offlineNotice: {
			alignSelf: "stretch",
			flexDirection: "row",
			alignItems: "center",
			gap: 12,
			padding: 16,
			backgroundColor: theme.surface,
			borderColor: theme.primary,
			borderWidth: 1,
			borderRadius: 12,
		},

		offlineNoticeCentered: {
			marginHorizontal: 16,
		},

		offlineNoticeText: {
			flex: 1,
			gap: 2,
		},

		offlineNoticeTitle: {
			fontSize: 16,
			fontWeight: fontWeight.semibold,
			color: theme.text,
		},

		galleryMessage: {
			alignItems: "flex-start",
			gap: 12,
			paddingHorizontal: 6,
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
			fontWeight: fontWeight.semibold,
			color: theme.text,
		},

		imagePlaceholder: {
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.border,
		},

		characterHeader: {
			flexDirection: "row",
			alignItems: "flex-start",
		},

		characterHeaderName: {
			flex: 1,
		},

		characterActionButton: {
			width: 44,
			height: 44,
			marginTop: -10,
			marginRight: -10,
			alignItems: "center",
			justifyContent: "center",
		},

		menuOverlay: {
			flex: 1,
		},

		menuBackdrop: {
			position: "absolute",
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},

		menu: {
			position: "absolute",
			minWidth: 180,
			paddingVertical: 8,
			backgroundColor: theme.surface,
			borderColor: theme.border,
			borderWidth: 1,
			borderRadius: 12,
			shadowColor: "#000000",
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.2,
			shadowRadius: 8,
			elevation: 8,
		},

		menuItem: {
			flexDirection: "row",
			alignItems: "center",
			gap: 12,
			minHeight: 48,
			paddingHorizontal: 16,
		},

		menuItemText: {
			fontSize: 16,
			fontWeight: fontWeight.regular,
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
			fontWeight: fontWeight.regular,
			color: theme.textSecondary,
		},

		detailsContent: {
			padding: 16,
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
			fontWeight: fontWeight.bold,
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
			fontWeight: fontWeight.regular,
			color: theme.textSecondary,
		},

		detailValue: {
			flexShrink: 1,
			fontSize: 16,
			fontWeight: fontWeight.regular,
			color: theme.text,
			textAlign: "right",
		},

		form: {
			flex: 1,
			backgroundColor: theme.background,
		},

		formContent: {
			padding: 16,
			gap: 16,
		},

		formField: {
			gap: 6,
		},

		formLabel: {
			fontSize: 14,
			fontWeight: fontWeight.semibold,
			color: theme.text,
		},

		formInput: {
			minHeight: 48,
			paddingHorizontal: 12,
			fontSize: 16,
			fontWeight: fontWeight.regular,
			color: theme.text,
			backgroundColor: theme.surface,
			borderColor: theme.textSecondary,
			borderWidth: 1,
			borderRadius: 8,
		},

		formInputError: {
			borderColor: theme.statusDead,
			borderWidth: 2,
		},

		formError: {
			fontSize: 14,
			fontWeight: fontWeight.regular,
			color: theme.statusDead,
		},

		formImagePreview: {
			width: 120,
			aspectRatio: 1,
			borderRadius: 12,
		},

		headerButton: {
			width: 48,
			height: 48,
			marginRight: 4,
			alignItems: "center",
			justifyContent: "center",
		},

		stackHeaderButton: {
			width: 48,
			height: 48,
			marginRight: -12,
			alignItems: "center",
			justifyContent: "center",
		},

		headerLeftButton: {
			width: 48,
			height: 48,
			marginLeft: -12,
			alignItems: "center",
			justifyContent: "center",
		},

		headerTextButton: {
			minWidth: 72,
			minHeight: 36,
			marginRight: 8,
			paddingHorizontal: 14,
			alignItems: "center",
			justifyContent: "center",
			borderColor: theme.primary,
			borderWidth: 1,
			borderRadius: PILL_RADIUS,
		},

		headerTextButtonText: {
			fontSize: 16,
			fontWeight: fontWeight.semibold,
			color: theme.primary,
		},

		settingGroups: {
			gap: 20,
		},

		optionSelector: {
			flexDirection: "row",
			gap: 8,
			marginTop: 12,
			padding: 8,
			backgroundColor: theme.background,
			borderRadius: PILL_RADIUS,
			borderWidth: 1,
			borderColor: theme.border,
		},

		optionButton: {
			flex: 1,
			minHeight: 44,
			paddingHorizontal: 8,
			borderRadius: PILL_RADIUS,
			alignItems: "center",
			justifyContent: "center",
		},

		optionText: {
			fontSize: 15,
			fontWeight: fontWeight.semibold,
		},

		resetButton: {
			alignSelf: "flex-end",
			marginBottom: 16,
			minHeight: 44,
			justifyContent: "center",
			paddingHorizontal: 20,
			borderRadius: PILL_RADIUS,
			borderWidth: 1,
			borderColor: theme.primary,
		},

		resetButtonDisabled: {
			borderColor: theme.border,
		},

		resetButtonText: {
			color: theme.primary,
			fontSize: 14,
			fontWeight: fontWeight.semibold,
		},

		resetButtonTextDisabled: {
			color: theme.textDisabled,
		},
	});
};
