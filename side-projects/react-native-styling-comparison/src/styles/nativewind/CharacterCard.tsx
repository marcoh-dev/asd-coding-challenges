import { Image } from "expo-image";
import { cssInterop } from "nativewind";
import { Text, View } from "react-native";

import type { Character } from "@/types/character";

cssInterop(Image, { className: "style" });

const statusDotColors = {
	Alive: "bg-status-alive dark:bg-status-alive-dark",
	Dead: "bg-status-dead dark:bg-status-dead-dark",
	unknown: "bg-text-secondary dark:bg-text-secondary-dark",
};

type Props = {
	character: Character;
};

export default function CharacterCard({ character }: Props) {
	return (
		<View
			className="flex-1 overflow-hidden rounded-xl border border-border bg-surface dark:border-border-dark dark:bg-surface-dark"
			accessible
			accessibilityLabel={`${character.name}, status ${character.status}, ${character.species}, gender ${character.gender}`}
		>
			<Image className="aspect-square w-full" source={character.image} contentFit="cover" />

			<View className="gap-1 p-2.5">
				<Text
					className="text-base font-semibold text-text dark:text-text-dark"
					numberOfLines={2}
				>
					{character.name}
				</Text>

				<View className="flex-row items-center gap-1.5">
					<View className={`size-2 rounded-full ${statusDotColors[character.status]}`} />
					<Text className="text-sm text-text-secondary dark:text-text-secondary-dark">
						{character.status}
					</Text>
				</View>

				<Text
					className="text-sm text-text-secondary dark:text-text-secondary-dark"
					numberOfLines={1}
				>
					{character.species} · {character.gender}
				</Text>
			</View>
		</View>
	);
}
