import { Image } from "expo-image";
import { styled } from "nativewind";
import { Text, View } from "react-native";

import type { Character } from "@/types/character";

const StyledImage = styled(Image, { className: "style" });

const statusDotColors = {
	Alive: "bg-status-alive",
	Dead: "bg-status-dead",
	unknown: "bg-text-secondary",
};

type Props = {
	character: Character;
};

export default function CharacterCard({ character }: Props) {
	return (
		<View
			className="flex-1 overflow-hidden rounded-xl border border-border bg-surface"
			accessible
			accessibilityLabel={`${character.name}, status ${character.status}, ${character.species}, gender ${character.gender}`}
		>
			<StyledImage
				className="aspect-square w-full"
				source={character.image}
				contentFit="cover"
			/>

			<View className="gap-1 p-2.5">
				<Text className="text-base font-semibold text-text" numberOfLines={2}>
					{character.name}
				</Text>

				<View className="flex-row items-center gap-1.5">
					<View className={`size-2 rounded-full ${statusDotColors[character.status]}`} />
					<Text className="text-sm text-text-secondary">{character.status}</Text>
				</View>

				<Text className="text-sm text-text-secondary" numberOfLines={1}>
					{character.species} · {character.gender}
				</Text>
			</View>
		</View>
	);
}
