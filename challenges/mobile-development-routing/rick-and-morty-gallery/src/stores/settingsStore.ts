import Storage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ThemeMode } from "@/theme/themes";

type ReducedMotionMode = "system" | "on" | "off";

type Settings = {
	themeMode: ThemeMode;
	reducedMotion: ReducedMotionMode;
};

type SettingsState = Settings & {
	setThemeMode: (themeMode: ThemeMode) => void;
	setReducedMotion: (reducedMotion: ReducedMotionMode) => void;
	resetSettings: () => void;
};

const defaultSettings: Settings = {
	themeMode: "system",
	reducedMotion: "system",
};

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			...defaultSettings,
			setThemeMode: (themeMode) => set({ themeMode }),
			setReducedMotion: (reducedMotion) => set({ reducedMotion }),
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
