import { FlatList } from "react-native";
import { Spinner, styled, TamaguiProvider, Text, YStack } from "tamagui";

import { useAppTheme } from "@/hooks/useAppTheme";
import { useCharacters } from "@/hooks/useCharacters";

import CharacterCard from "./CharacterCard";
import { tamaguiConfig } from "./tamagui.config";

const Centered = styled(YStack, {
	flex: 1,
	items: "center",
	justify: "center",
	gap: 16,
	backgroundColor: "background",
});

const Button = styled(YStack, {
	minH: 44,
	justify: "center",
	px: 20,
	rounded: 999,
	backgroundColor: "primary",
	opacity: { default: 1, press: 0.7 },
});

export default function CharacterScreen() {
	const { isDark } = useAppTheme();

	return (
		<TamaguiProvider config={tamaguiConfig} defaultTheme={isDark ? "dark" : "light"}>
			<Characters />
		</TamaguiProvider>
	);
}

function Characters() {
	const { data, isPending, isError, refetch } = useCharacters();

	if (isPending) {
		return (
			<Centered>
				<Spinner size="large" color="primary" accessibilityLabel="Loading characters" />
			</Centered>
		);
	}

	if (isError) {
		return (
			<Centered>
				<Text fontSize={16} color="text">
					Could not load the characters.
				</Text>
				<Button onPress={() => refetch()} accessibilityRole="button">
					<Text fontSize={14} fontWeight="600" color="background">
						Try again
					</Text>
				</Button>
			</Centered>
		);
	}

	return (
		<YStack flex={1} backgroundColor="background">
			<FlatList
				contentContainerStyle={{ gap: 12, padding: 16 }}
				columnWrapperStyle={{ gap: 12 }}
				data={data}
				numColumns={2}
				keyExtractor={(character) => String(character.id)}
				renderItem={({ item }) => <CharacterCard character={item} />}
			/>
		</YStack>
	);
}
