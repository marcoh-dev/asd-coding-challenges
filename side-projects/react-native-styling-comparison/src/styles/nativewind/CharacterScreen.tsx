import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";
import { useCharacters } from "@/hooks/useCharacters";

import CharacterCard from "./CharacterCard";

export default function CharacterScreen() {
	const { theme } = useAppTheme();
	const { data, isPending, isError, refetch } = useCharacters();

	if (isPending) {
		return (
			<View className="flex-1 items-center justify-center bg-background">
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
			<View className="flex-1 items-center justify-center gap-4 bg-background">
				<Text className="text-base text-text">Could not load the characters.</Text>
				<Pressable
					className="min-h-11 justify-center rounded-full bg-primary px-5 active:opacity-70"
					onPress={() => refetch()}
					accessibilityRole="button"
				>
					<Text className="text-sm font-semibold text-background">Try again</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<FlatList
			className="bg-background"
			contentContainerClassName="gap-3 p-4"
			columnWrapperClassName="gap-3"
			data={data}
			numColumns={2}
			keyExtractor={(character) => String(character.id)}
			renderItem={({ item }) => <CharacterCard character={item} />}
		/>
	);
}
