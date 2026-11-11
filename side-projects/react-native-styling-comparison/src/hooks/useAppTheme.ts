import { useColorScheme } from "react-native";

import { darkTheme, lightTheme } from "@/theme/themes";

export function useAppTheme() {
	const isDark = useColorScheme() === "dark";
	return { theme: isDark ? darkTheme : lightTheme, isDark };
}
