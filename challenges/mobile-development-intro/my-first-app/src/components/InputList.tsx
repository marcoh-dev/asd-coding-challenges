import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

export default function InputList() {
	const { theme, styles } = useTheme();

	const [input, setInput] = useState("");
	const [items, setItems] = useState<string[]>([]);

	function handleSubmit() {
		if (!input.trim()) return;

		setItems((prev) => [...prev, input.trim()]);
		setInput("");
	}

	return (
		<View>
			<TextInput
				placeholder="Enter text..."
				placeholderTextColor={theme.textSecondary}
				value={input}
				onChangeText={setInput}
				onSubmitEditing={handleSubmit}
				returnKeyType="done"
				submitBehavior="submit"
				style={styles.textInput}
			/>

			<Pressable onPress={handleSubmit} style={styles.submitButton}>
				<Text style={styles.submitButtonText}>Submit</Text>
			</Pressable>

			<View style={styles.itemList}>
				{items.map((val, i) => (
					<View key={i} style={styles.listItem}>
						<Text style={styles.text}>{val}</Text>
					</View>
				))}
			</View>
		</View>
	);
}
