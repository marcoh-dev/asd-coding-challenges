import { AccessibilityInfo } from "react-native";

import { createAccessibilityHook } from "./createAccessibilityHook";

export const useReducedMotion = createAccessibilityHook(
	"reducedMotion",
	() => AccessibilityInfo.isReduceMotionEnabled(),
	"reduceMotionChanged",
);
