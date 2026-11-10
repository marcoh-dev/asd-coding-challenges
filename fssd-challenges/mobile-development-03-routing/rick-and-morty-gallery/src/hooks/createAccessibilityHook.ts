import { useSyncExternalStore } from "react";
import { AccessibilityInfo } from "react-native";

import { type AccessibilitySetting, useSettingsStore } from "@/stores/settingsStore";

type EventName = Exclude<
	Parameters<typeof AccessibilityInfo.addEventListener>[0],
	"announcementFinished"
>;

export function createAccessibilityHook(
	setting: AccessibilitySetting,
	isSystemEnabled: () => Promise<boolean>,
	eventName: EventName,
) {
	let systemEnabled = false;
	const listeners = new Set<() => void>();

	function setSystemEnabled(value: boolean) {
		systemEnabled = value;
		listeners.forEach((listener) => listener());
	}

	isSystemEnabled().then(setSystemEnabled);
	AccessibilityInfo.addEventListener(eventName, setSystemEnabled);

	function subscribe(listener: () => void) {
		listeners.add(listener);

		return () => {
			listeners.delete(listener);
		};
	}

	function getSnapshot() {
		return systemEnabled;
	}

	return function useAccessibilitySetting() {
		const mode = useSettingsStore((state) => state[setting]);
		const system = useSyncExternalStore(subscribe, getSnapshot);

		return mode === "system" ? system : mode === "on";
	};
}
