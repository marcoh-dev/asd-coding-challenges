import { ActivityIndicator, FlatList } from "react-native";
import { styled, ThemeProvider, useTheme } from "styled-components/native";

import { useAppTheme } from "@/hooks/useAppTheme";
import { useCharacters } from "@/hooks/useCharacters";
import type { Character } from "@/types/character";

import CharacterCard from "./CharacterCard";

const Centered = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	gap: 16px;
	background-color: ${({ theme }) => theme.background};
`;

const Message = styled.Text`
	font-size: 16px;
	color: ${({ theme }) => theme.text};
`;

const Button = styled.Pressable`
	min-height: 44px;
	justify-content: center;
	padding: 0 20px;
	border-radius: 999px;
	background-color: ${({ theme }) => theme.primary};
`;

const ButtonText = styled.Text<{ $pressed: boolean }>`
	font-size: 14px;
	font-weight: 600;
	color: ${({ theme }) => theme.background};
	opacity: ${({ $pressed }) => ($pressed ? 0.7 : 1)};
`;

const List = styled(FlatList<Character>).attrs({
	contentContainerStyle: { gap: 12, padding: 16 },
	columnWrapperStyle: { gap: 12 },
})`
	background-color: ${({ theme }) => theme.background};
`;

export default function CharacterScreen() {
	const { theme } = useAppTheme();

	return (
		<ThemeProvider theme={theme}>
			<Characters />
		</ThemeProvider>
	);
}

function Characters() {
	const theme = useTheme();
	const { data, isPending, isError, refetch } = useCharacters();

	if (isPending) {
		return (
			<Centered>
				<ActivityIndicator
					size="large"
					color={theme.primary}
					accessibilityLabel="Loading characters"
				/>
			</Centered>
		);
	}

	if (isError) {
		return (
			<Centered>
				<Message>Could not load the characters.</Message>
				<Button onPress={() => refetch()} accessibilityRole="button">
					{({ pressed }) => <ButtonText $pressed={pressed}>Try again</ButtonText>}
				</Button>
			</Centered>
		);
	}

	return (
		<List
			data={data}
			numColumns={2}
			keyExtractor={(character) => String(character.id)}
			renderItem={({ item }) => <CharacterCard character={item} />}
		/>
	);
}
