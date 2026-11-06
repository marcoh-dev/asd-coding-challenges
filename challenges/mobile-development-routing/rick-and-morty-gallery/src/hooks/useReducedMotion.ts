import { useSyncExternalStore } from "react";
import { AccessibilityInfo } from "react-native";

import { useSettingsStore } from "@/stores/settingsStore";

let systemReducedMotion = false;
const listeners = new Set<() => void>();

function setSystemReducedMotion(value: boolean) {
	systemReducedMotion = value;
	listeners.forEach((listener) => listener());
}

AccessibilityInfo.isReduceMotionEnabled().then(setSystemReducedMotion);
AccessibilityInfo.addEventListener("reduceMotionChanged", setSystemReducedMotion);

function subscribe(listener: () => void) {
	listeners.add(listener);

	return () => {
		listeners.delete(listener);
	};
}

function getSnapshot() {
	return systemReducedMotion;
}

export function useReducedMotion() {
	const mode = useSettingsStore((state) => state.reducedMotion);
	const system = useSyncExternalStore(subscribe, getSnapshot);

	return mode === "system" ? system : mode === "on";
}
