import { Search, X } from "lucide-react-native";
import type { Ref } from "react";
import { Pressable, TextInput, type TextInputInstance, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

const MAX_LENGTH = 50;

type Props = {
	ref: Ref<TextInputInstance>;
	value: string;
	onChangeText: (value: string) => void;
	onSubmit: () => void;
	onClear: () => void;
};

export default function SearchInput({ ref, value, onChangeText, onSubmit, onClear }: Props) {
	const { theme, styles } = useTheme();

	return (
		<View style={styles.searchInput}>
			<Search size={20} color={theme.textSecondary} />

			<TextInput
				ref={ref}
				style={styles.searchInputText}
				value={value}
				onChangeText={onChangeText}
				onSubmitEditing={onSubmit}
				maxLength={MAX_LENGTH}
				placeholder="Search characters"
				placeholderTextColor={theme.textSecondary}
				selectionColor={theme.primary}
				inputMode="search"
				enterKeyHint="search"
				autoCapitalize="none"
				autoComplete="off"
				autoCorrect={false}
				spellCheck={false}
				accessibilityRole="search"
				accessibilityLabel="Search characters"
				accessibilityHint="Results update as you type"
			/>

			{value.length > 0 && (
				<Pressable
					style={({ pressed }) => [styles.searchClearButton, pressed && styles.pressed]}
					onPress={onClear}
					accessibilityRole="button"
					accessibilityLabel="Clear search"
				>
					<X size={20} color={theme.textSecondary} />
				</Pressable>
			)}
		</View>
	);
}
