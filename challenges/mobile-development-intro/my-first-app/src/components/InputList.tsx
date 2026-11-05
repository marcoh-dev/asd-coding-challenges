import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

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

	function handleSubmit() {
		const text = input.trim();
		if (!text) return;

		setItems((prev) => [...prev, { id: nextId.current++, text }]);
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
				{items.map((item) => (
					<View key={item.id} style={styles.listItem}>
						<Text style={styles.text}>{item.text}</Text>
					</View>
				))}
			</View>
		</View>
	);
}
