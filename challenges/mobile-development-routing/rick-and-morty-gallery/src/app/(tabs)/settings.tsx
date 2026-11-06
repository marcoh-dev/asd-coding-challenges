import { View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

export default function Settings() {
	const { styles } = useTheme();

	return <View style={styles.container} />;
}
