import { Image } from "expo-image";
import { styled, Text, XStack, YStack } from "tamagui";

import type { Character } from "@/types/character";

const Card = styled(YStack, {
	flex: 1,
	overflow: "hidden",
	borderWidth: 1,
	rounded: 12,
	borderColor: "border",
	backgroundColor: "surface",
});

const Detail = styled(Text, {
	fontSize: 14,
	color: "textSecondary",
});

const statusColors = {
	Alive: "statusAlive",
	Dead: "statusDead",
	unknown: "textSecondary",
} as const;

type Props = {
	character: Character;
};

export default function CharacterCard({ character }: Props) {
	return (
		<Card
			accessible
			accessibilityLabel={`${character.name}, status ${character.status}, ${character.species}, gender ${character.gender}`}
		>
			<Image
				style={{ width: "100%", aspectRatio: 1 }}
				source={character.image}
				contentFit="cover"
			/>

			<YStack gap={4} p={10}>
				<Text fontSize={16} fontWeight="600" color="text" numberOfLines={2}>
					{character.name}
				</Text>

				<XStack items="center" gap={6}>
					<YStack
						w={8}
						h={8}
						rounded={4}
						backgroundColor={statusColors[character.status]}
					/>
					<Detail>{character.status}</Detail>
				</XStack>

				<Detail numberOfLines={1}>
					{character.species} · {character.gender}
				</Detail>
			</YStack>
		</Card>
	);
}
