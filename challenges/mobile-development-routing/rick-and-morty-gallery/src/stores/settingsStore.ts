import Storage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ThemeMode } from "@/theme/themes";

type SettingsState = {
	themeMode: ThemeMode;
	setThemeMode: (themeMode: ThemeMode) => void;
};

export const useSettingsStore = create<SettingsState>()(
	persist(
		(set) => ({
			themeMode: "system",
			setThemeMode: (themeMode) => set({ themeMode }),
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
