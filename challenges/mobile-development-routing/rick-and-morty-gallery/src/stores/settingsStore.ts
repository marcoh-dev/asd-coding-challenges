import Storage from "expo-sqlite/kv-store";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ThemeMode } from "@/theme/themes";

type AccessibilityMode = "system" | "on" | "off";

type Settings = {
	themeMode: ThemeMode;
	reducedMotion: AccessibilityMode;
	boldText: AccessibilityMode;
};

export type AccessibilitySetting = Exclude<keyof Settings, "themeMode">;

type SettingsState = Settings & {
	setThemeMode: (themeMode: ThemeMode) => void;
	setReducedMotion: (reducedMotion: AccessibilityMode) => void;
	setBoldText: (boldText: AccessibilityMode) => void;
	resetSettings: () => void;
};

export const defaultSettings: Settings = {
	themeMode: "system",
	reducedMotion: "system",
	boldText: Platform.OS === "ios" ? "system" : "off",
};

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			...defaultSettings,
			setThemeMode: (themeMode) => set({ themeMode }),
			setReducedMotion: (reducedMotion) => set({ reducedMotion }),
			setBoldText: (boldText) => set({ boldText }),
			resetSettings: () => set(defaultSettings),
		}),
		{
			name: "settings",
			storage: createJSONStorage(() => ({
				getItem: (key) => Storage.getItemSync(key),
				setItem: (key, value) => Storage.setItemSync(key, value),
				removeItem: (key) => {
					Storage.removeItemSync(key);
				},
			})),
		},
	),
);
