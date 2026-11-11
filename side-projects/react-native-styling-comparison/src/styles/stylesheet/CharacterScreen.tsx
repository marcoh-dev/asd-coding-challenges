import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";
import { useCharacters } from "@/hooks/useCharacters";
import type { AppTheme } from "@/theme/themes";

import CharacterCard from "./CharacterCard";

export default function CharacterScreen() {
	const { theme } = useAppTheme();
	const styles = createStyles(theme);
	const { data, isPending, isError, refetch } = useCharacters();

	if (isPending) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator
					size="large"
					color={theme.primary}
					accessibilityLabel="Loading characters"
				/>
			</View>
		);
	}

	if (isError) {
		return (
			<View style={styles.centered}>
				<Text style={styles.message}>Could not load the characters.</Text>
				<Pressable
					style={({ pressed }) => [styles.button, pressed && styles.pressed]}
					onPress={() => refetch()}
					accessibilityRole="button"
				>
					<Text style={styles.buttonText}>Try again</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<FlatList
			style={styles.list}
			contentContainerStyle={styles.listContent}
			columnWrapperStyle={styles.row}
			data={data}
			numColumns={2}
			keyExtractor={(character) => String(character.id)}
			renderItem={({ item }) => <CharacterCard character={item} />}
		/>
	);
}

function createStyles(theme: AppTheme) {
	return StyleSheet.create({
		list: {
			backgroundColor: theme.background,
		},
		listContent: {
			gap: 12,
			padding: 16,
		},
		row: {
			gap: 12,
		},
		centered: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			gap: 16,
			backgroundColor: theme.background,
		},
		message: {
			fontSize: 16,
			color: theme.text,
		},
		button: {
			minHeight: 44,
			justifyContent: "center",
			paddingHorizontal: 20,
			borderRadius: 999,
			backgroundColor: theme.primary,
		},
		pressed: {
			opacity: 0.7,
		},
		buttonText: {
			fontSize: 14,
			fontWeight: "600",
			color: theme.background,
		},
	});
}
