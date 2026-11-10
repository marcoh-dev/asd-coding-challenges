import type { UseQueryResult } from "@tanstack/react-query";
import { ActivityIndicator, View } from "react-native";

import { isNotFoundError } from "@/api/characters";
import ErrorMessage from "@/components/ErrorMessage";
import OfflineNotice from "@/components/OfflineNotice";
import { useTheme } from "@/theme/ThemeProvider";
import type { Character } from "@/types/character";

type Props = {
	query: UseQueryResult<Character>;
};

export default function CharacterFallback({ query }: Props) {
	const { theme, styles } = useTheme();
	const { error, isFetching, isPaused, refetch } = query;

	return (
		<View style={styles.centered}>
			{isFetching ? (
				<ActivityIndicator
					size="large"
					color={theme.primary}
					accessibilityLabel="Loading character"
				/>
			) : isPaused ? (
				<OfflineNotice
					message="This character loads as soon as you’re back online."
					style={styles.offlineNoticeCentered}
				/>
			) : isNotFoundError(error) ? (
				<ErrorMessage message="This character doesn’t exist." />
			) : (
				<ErrorMessage message="Could not load this character." onRetry={() => refetch()} />
			)}
		</View>
	);
}
