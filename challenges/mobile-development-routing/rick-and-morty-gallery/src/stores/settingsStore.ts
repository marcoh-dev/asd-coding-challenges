import Storage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ThemeMode } from "@/theme/themes";

type ReducedMotionMode = "system" | "on" | "off";

type SettingsState = {
	themeMode: ThemeMode;
	reducedMotion: ReducedMotionMode;
	setThemeMode: (themeMode: ThemeMode) => void;
	setReducedMotion: (reducedMotion: ReducedMotionMode) => void;
};

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			themeMode: "system",
			reducedMotion: "system",
			setThemeMode: (themeMode) => set({ themeMode }),
			setReducedMotion: (reducedMotion) => set({ reducedMotion }),
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
