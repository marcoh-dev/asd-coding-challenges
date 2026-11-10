import { AccessibilityInfo, Platform } from "react-native";

import { createAccessibilityHook } from "./createAccessibilityHook";

export const useHighContrast =
	Platform.OS === "ios"
		? createAccessibilityHook(
				"highContrast",
				() => AccessibilityInfo.isDarkerSystemColorsEnabled(),
				"darkerSystemColorsChanged",
			)
		: createAccessibilityHook(
				"highContrast",
				() => AccessibilityInfo.isHighTextContrastEnabled(),
				"highTextContrastChanged",
			);
