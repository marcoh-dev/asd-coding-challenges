import { type InfiniteData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from "react-native";

import { type CharacterPage, CHARACTERS_QUERY_KEY, fetchCharacters } from "@/api/characters";
import CharacterItem from "@/components/CharacterItem";
import { useTheme } from "@/theme/ThemeProvider";

export default function Gallery() {
	const { theme, styles } = useTheme();
	const queryClient = useQueryClient();
	const [isRefreshing, setIsRefreshing] = useState(false);

	const {
		data,
		isFetching,
		refetch,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetchNextPageError,
	} = useInfiniteQuery({
		queryKey: CHARACTERS_QUERY_KEY,
		queryFn: fetchCharacters,
		initialPageParam: 1,
		getNextPageParam: (lastPage, _allPages, lastPageParam) =>
			lastPage.info.next ? lastPageParam + 1 : undefined,
	});

	const characters = data?.pages.flatMap((page) => page.results);

	async function handleRefresh() {
		setIsRefreshing(true);
		queryClient.setQueryData<InfiniteData<CharacterPage, number>>(
			CHARACTERS_QUERY_KEY,
			(current) =>
				current && {
					pages: current.pages.slice(0, 1),
					pageParams: current.pageParams.slice(0, 1),
				},
		);
		await refetch();
		setIsRefreshing(false);
	}

	function handleEndReached() {
		if (hasNextPage && !isFetching && !isFetchNextPageError) {
			fetchNextPage();
		}
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
			onEndReached={handleEndReached}
			onEndReachedThreshold={1}
			ListFooterComponent={
				<View style={styles.galleryFooter}>
					{isFetchingNextPage && (
						<ActivityIndicator
							color={theme.primary}
							accessibilityLabel="Loading more characters"
						/>
					)}

					{isFetchNextPageError && !isFetchingNextPage && (
						<>
							<Text style={styles.text} accessibilityRole="alert">
								Could not load more characters.
							</Text>

							<Pressable
								style={styles.button}
								onPress={() => fetchNextPage()}
								accessibilityRole="button"
							>
								<Text style={styles.buttonText}>Try again</Text>
							</Pressable>
						</>
					)}
				</View>
			}
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
