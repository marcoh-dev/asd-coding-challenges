import { type InfiniteData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useScrollToTop } from "expo-router";
import { useRef, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	Pressable,
	RefreshControl,
	Text,
	useWindowDimensions,
	View,
} from "react-native";

import { type CharacterPage, charactersQueryKey, fetchCharacters } from "@/api/characters";
import CharacterItem from "@/components/CharacterItem";
import ScrollTopButton from "@/components/ScrollTopButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/theme/ThemeProvider";
import type { Character } from "@/types/character";

const LARGE_FONT_SCALE = 1.5;

export default function Gallery() {
	const { theme, styles } = useTheme();
	const queryClient = useQueryClient();
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const listRef = useRef<FlatList<Character>>(null);
	const { height, fontScale } = useWindowDimensions();
	const numColumns = fontScale >= LARGE_FONT_SCALE ? 1 : 2;
	const reducedMotion = useReducedMotion();
	const queryKey = charactersQueryKey("");

	useScrollToTop(listRef);

	const {
		data,
		isFetching,
		refetch,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetchNextPageError,
	} = useInfiniteQuery({
		queryKey,
		queryFn: (context) => fetchCharacters("", context),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _allPages, lastPageParam) =>
			lastPage.info.next ? lastPageParam + 1 : undefined,
	});

	const characters = data?.pages.flatMap((page) => page.results);

	async function handleRefresh() {
		setIsRefreshing(true);
		queryClient.setQueryData<InfiniteData<CharacterPage, number>>(
			queryKey,
			(current) =>
				current && {
					pages: current.pages.slice(0, 1),
					pageParams: current.pageParams.slice(0, 1),
				},
		);
		await refetch();
		setIsRefreshing(false);
	}

	function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
		setShowScrollTop(event.nativeEvent.contentOffset.y > height);
	}

	function scrollToTop() {
		listRef.current?.scrollToOffset({ offset: 0, animated: !reducedMotion });
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
		<View style={styles.gallery}>
			<FlatList
				key={numColumns}
				ref={listRef}
				style={styles.gallery}
				data={characters}
				keyExtractor={(character) => String(character.id)}
				renderItem={({ item }) => <CharacterItem character={item} />}
				numColumns={numColumns}
				columnWrapperStyle={numColumns > 1 ? styles.galleryRow : undefined}
				contentContainerStyle={styles.galleryContent}
				onScroll={handleScroll}
				scrollEventThrottle={100}
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

			<ScrollTopButton visible={showScrollTop} onPress={scrollToTop} />
		</View>
	);
}
