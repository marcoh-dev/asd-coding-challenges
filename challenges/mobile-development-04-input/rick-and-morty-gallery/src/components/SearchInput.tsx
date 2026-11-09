import { Search, X } from "lucide-react-native";
import { Pressable, TextInput, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type Props = {
	value: string;
	onChangeText: (value: string) => void;
};

export default function SearchInput({ value, onChangeText }: Props) {
	const { theme, styles } = useTheme();

	return (
		<View style={styles.searchInput}>
			<Search size={20} color={theme.textSecondary} />

			<TextInput
				style={styles.searchInputText}
				value={value}
				onChangeText={onChangeText}
				placeholder="Search characters"
				placeholderTextColor={theme.textSecondary}
				selectionColor={theme.primary}
				inputMode="search"
				enterKeyHint="search"
				autoCapitalize="none"
				autoComplete="off"
				autoCorrect={false}
				spellCheck={false}
				accessibilityLabel="Search characters"
			/>

			{value.length > 0 && (
				<Pressable
					style={({ pressed }) => [styles.searchClearButton, pressed && styles.pressed]}
					onPress={() => onChangeText("")}
					accessibilityRole="button"
					accessibilityLabel="Clear search"
				>
					<X size={20} color={theme.textSecondary} />
				</Pressable>
			)}
		</View>
	);
}
