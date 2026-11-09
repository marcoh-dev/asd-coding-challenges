import { AccessibilityInfo } from "react-native";

import { createAccessibilityHook } from "./createAccessibilityHook";

export const useBoldText = createAccessibilityHook(
	"boldText",
	() => AccessibilityInfo.isBoldTextEnabled(),
	"boldTextChanged",
);
