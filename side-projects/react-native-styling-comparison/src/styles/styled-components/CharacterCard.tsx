import { Image } from "expo-image";
import { styled } from "styled-components/native";

import type { Character, CharacterStatus } from "@/types/character";

const Card = styled.View`
	flex: 1;
	overflow: hidden;
	border-width: 1px;
	border-radius: 12px;
	border-color: ${({ theme }) => theme.border};
	background-color: ${({ theme }) => theme.surface};
`;

const CharacterImage = styled(Image)`
	width: 100%;
	aspect-ratio: 1;
`;

const Info = styled.View`
	gap: 4px;
	padding: 10px;
`;

const Name = styled.Text`
	font-size: 16px;
	font-weight: 600;
	color: ${({ theme }) => theme.text};
`;

const Status = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 6px;
`;

const StatusDot = styled.View<{ $status: CharacterStatus }>`
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background-color: ${({ theme, $status }) =>
		({ Alive: theme.statusAlive, Dead: theme.statusDead, unknown: theme.textSecondary })[
			$status
		]};
`;

const Detail = styled.Text`
	font-size: 14px;
	color: ${({ theme }) => theme.textSecondary};
`;

type Props = {
	character: Character;
};

export default function CharacterCard({ character }: Props) {
	return (
		<Card
			accessible
			accessibilityLabel={`${character.name}, status ${character.status}, ${character.species}, gender ${character.gender}`}
		>
			<CharacterImage source={character.image} contentFit="cover" />

			<Info>
				<Name numberOfLines={2}>{character.name}</Name>

				<Status>
					<StatusDot $status={character.status} />
					<Detail>{character.status}</Detail>
				</Status>

				<Detail numberOfLines={1}>
					{character.species} · {character.gender}
				</Detail>
			</Info>
		</Card>
	);
}
