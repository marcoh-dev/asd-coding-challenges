import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from "react-native";

import { fetchCharacters } from "@/api/characters";
import CharacterItem from "@/components/CharacterItem";
import { useTheme } from "@/theme/ThemeProvider";

export default function Gallery() {
	const { theme, styles } = useTheme();
	const [isRefreshing, setIsRefreshing] = useState(false);

	const {
		data: characters,
		isFetching,
		refetch,
	} = useQuery({
		queryKey: ["characters"],
		queryFn: fetchCharacters,
	});

	async function handleRefresh() {
		setIsRefreshing(true);
		await refetch();
		setIsRefreshing(false);
	}

	if (!characters && isFetching) {
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

	if (!characters) {
		return (
			<View style={styles.centered}>
				<Text style={styles.text} accessibilityRole="alert">
					Could not load the characters.
				</Text>

				<Pressable
					style={styles.button}
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
			style={styles.gallery}
			data={characters}
			keyExtractor={(character) => String(character.id)}
			renderItem={({ item }) => <CharacterItem character={item} />}
			numColumns={2}
			columnWrapperStyle={styles.galleryRow}
			contentContainerStyle={styles.galleryContent}
			refreshControl={
				<RefreshControl
					refreshing={isRefreshing}
					onRefresh={handleRefresh}
					tintColor={theme.primary}
					colors={[theme.primary]}
				/>
			}
		/>
	);
}
