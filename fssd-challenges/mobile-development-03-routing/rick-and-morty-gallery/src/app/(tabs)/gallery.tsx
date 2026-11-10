import { View } from "react-native";

import Gallery from "@/components/Gallery";
import { useTheme } from "@/theme/ThemeProvider";

export default function GalleryScreen() {
	const { styles } = useTheme();

	return (
		<View style={styles.container}>
			<Gallery />
		</View>
	);
}
