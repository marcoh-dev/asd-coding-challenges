import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

import { createStyles } from "../theme/createStyles";
import type { AppTheme } from "../theme/themes";

type Props = {
	theme: AppTheme;
};

export default function InputList({ theme }: Props) {
	const styles = createStyles(theme);

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
