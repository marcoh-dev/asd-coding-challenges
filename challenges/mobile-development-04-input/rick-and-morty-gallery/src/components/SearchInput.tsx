import { Search, X } from "lucide-react-native";
import { useRef } from "react";
import {
	AccessibilityInfo,
	Pressable,
	TextInput,
	type TextInputInstance,
	View,
} from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type Props = {
	value: string;
	onChangeText: (value: string) => void;
};

export default function SearchInput({ value, onChangeText }: Props) {
	const { theme, styles } = useTheme();
	const inputRef = useRef<TextInputInstance>(null);

	function clear() {
		onChangeText("");

		if (inputRef.current) {
			inputRef.current.focus();
			AccessibilityInfo.sendAccessibilityEvent(inputRef.current, "focus");
		}
	}

	return (
		<View style={styles.searchInput}>
			<Search size={20} color={theme.textSecondary} />

			<TextInput
				ref={inputRef}
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
				accessibilityRole="search"
				accessibilityLabel="Search characters"
				accessibilityHint="Results update as you type"
			/>

			{value.length > 0 && (
				<Pressable
					style={({ pressed }) => [styles.searchClearButton, pressed && styles.pressed]}
					onPress={clear}
					accessibilityRole="button"
					accessibilityLabel="Clear search"
				>
					<X size={20} color={theme.textSecondary} />
				</Pressable>
			)}
		</View>
	);
}
