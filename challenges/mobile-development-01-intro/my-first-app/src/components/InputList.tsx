import { X } from "lucide-react-native";
import { useRef, useState } from "react";
import { AccessibilityInfo, Pressable, Text, TextInput, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type Item = {
	id: number;
	text: string;
};

export default function InputList() {
	const { theme, styles } = useTheme();

	const [input, setInput] = useState("");
	const [items, setItems] = useState<Item[]>([]);
	const nextId = useRef(0);
	const canSubmit = input.trim().length > 0;

	function handleSubmit() {
		const text = input.trim();
		if (!text) return;

		setItems((prev) => [...prev, { id: nextId.current++, text }]);
		setInput("");
		AccessibilityInfo.announceForAccessibility(`Added: ${text}`);
	}

	function handleDelete(deleted: Item) {
		setItems((prev) => prev.filter((item) => item.id !== deleted.id));
		AccessibilityInfo.announceForAccessibility(`Deleted: ${deleted.text}`);
	}

	return (
		<View>
			<TextInput
				placeholder="Enter text..."
				accessibilityLabel="New list item"
				placeholderTextColor={theme.textSecondary}
				value={input}
				onChangeText={setInput}
				onSubmitEditing={handleSubmit}
				returnKeyType="done"
				submitBehavior="submit"
				style={styles.textInput}
			/>

			<Pressable
				onPress={handleSubmit}
				disabled={!canSubmit}
				accessibilityRole="button"
				accessibilityState={{ disabled: !canSubmit }}
				style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
			>
				<Text
					style={[styles.submitButtonText, !canSubmit && styles.submitButtonTextDisabled]}
				>
					Submit
				</Text>
			</Pressable>

			<View style={styles.itemList}>
				{items.map((item) => (
					<View key={item.id} style={styles.listItem}>
						<Text style={[styles.text, styles.listItemText]}>{item.text}</Text>

						<Pressable
							onPress={() => handleDelete(item)}
							accessibilityRole="button"
							accessibilityLabel={`Delete ${item.text}`}
							hitSlop={12}
						>
							<X size={18} color={theme.textSecondary} />
						</Pressable>
					</View>
				))}
			</View>
		</View>
	);
}
