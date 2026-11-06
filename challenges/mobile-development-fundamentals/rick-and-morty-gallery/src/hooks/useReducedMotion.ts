import { useSyncExternalStore } from "react";
import { AccessibilityInfo } from "react-native";

let reducedMotion = false;
const listeners = new Set<() => void>();

function setReducedMotion(value: boolean) {
	reducedMotion = value;
	listeners.forEach((listener) => listener());
}

AccessibilityInfo.isReduceMotionEnabled().then(setReducedMotion);
AccessibilityInfo.addEventListener("reduceMotionChanged", setReducedMotion);

function subscribe(listener: () => void) {
	listeners.add(listener);

	return () => {
		listeners.delete(listener);
	};
}

function getSnapshot() {
	return reducedMotion;
}

export function useReducedMotion() {
	return useSyncExternalStore(subscribe, getSnapshot);
}
