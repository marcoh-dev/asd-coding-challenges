import {
	type InfiniteData,
	keepPreviousData,
	onlineManager,
	useInfiniteQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { useScrollToTop } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	AccessibilityInfo,
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
import ErrorMessage from "@/components/ErrorMessage";
import OfflineNotice from "@/components/OfflineNotice";
import ScrollTopButton from "@/components/ScrollTopButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/theme/ThemeProvider";
import type { Character } from "@/types/character";

const LARGE_FONT_SCALE = 1.5;

type Props = {
	search: string;
	onClearSearch: () => void;
};

export default function Gallery({ search, onClearSearch }: Props) {
	const { theme, styles } = useTheme();
	const queryClient = useQueryClient();
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const listRef = useRef<FlatList<Character>>(null);
	const announcedSearch = useRef(search);
	const { height, fontScale } = useWindowDimensions();
	const numColumns = fontScale >= LARGE_FONT_SCALE ? 1 : 2;
	const reducedMotion = useReducedMotion();
	const queryKey = charactersQueryKey(search);

	useScrollToTop(listRef);

	useEffect(() => {
		listRef.current?.scrollToOffset({ offset: 0, animated: false });
	}, [search]);

	const {
		data,
		isFetching,
		refetch,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetchNextPageError,
		isPlaceholderData,
		isPaused,
		errorUpdateCount,
	} = useInfiniteQuery({
		queryKey,
		queryFn: (context) => fetchCharacters(search, context),
		placeholderData: keepPreviousData,
		initialPageParam: 1,
		getNextPageParam: (lastPage, _allPages, lastPageParam) =>
			lastPage.info.next ? lastPageParam + 1 : undefined,
	});

	const hidePreviousResults = isPlaceholderData && (isPaused || errorUpdateCount > 0);
	const characters = hidePreviousResults
		? undefined
		: data?.pages.flatMap((page) => page.results);
	const count = data?.pages[0]?.info.count ?? 0;
	const countText = `${count} ${count === 1 ? "character" : "characters"}${search ? " found" : ""}`;

	useEffect(() => {
		if (!data || isPlaceholderData || announcedSearch.current === search) {
			return;
		}

		announcedSearch.current = search;
		AccessibilityInfo.announceForAccessibility(countText);
	}, [data, isPlaceholderData, search, countText]);

	async function handleRefresh() {
		if (!onlineManager.isOnline()) {
			return;
		}

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
		const offset = event.nativeEvent.contentOffset.y;

		setIsScrolled(offset > 0);
		setShowScrollTop(offset > height);
	}

	function scrollToTop() {
		listRef.current?.scrollToOffset({ offset: 0, animated: !reducedMotion });
	}

	function handleEndReached() {
		if (hasNextPage && !isFetching && !isPaused && !isFetchNextPageError) {
			fetchNextPage();
		}
	}

	if (!characters && isPaused) {
		return (
			<View style={styles.galleryError}>
				<OfflineNotice message="The characters load as soon as you’re back online." />
			</View>
		);
	}

	if (!characters && isFetching) {
		return (
			<View style={styles.galleryLoading}>
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
			<View style={styles.galleryError}>
				<ErrorMessage message="Could not load the characters." onRetry={() => refetch()} />
			</View>
		);
	}

	return (
		<View style={styles.gallery}>
			<Text style={[styles.galleryCount, isPlaceholderData && styles.galleryStale]}>
				{countText}
			</Text>

			<View style={styles.gallery}>
				<FlatList
					key={numColumns}
					ref={listRef}
					style={[styles.gallery, isPlaceholderData && styles.galleryStale]}
					accessibilityState={{ busy: isPlaceholderData }}
					data={characters}
					keyExtractor={(character) => String(character.id)}
					renderItem={({ item }) => (
						<View style={[styles.galleryItem, { maxWidth: `${100 / numColumns}%` }]}>
							<CharacterItem character={item} />
						</View>
					)}
					numColumns={numColumns}
					contentContainerStyle={styles.galleryContent}
					keyboardDismissMode="on-drag"
					keyboardShouldPersistTaps="handled"
					onScroll={handleScroll}
					scrollEventThrottle={100}
					onEndReached={handleEndReached}
					onEndReachedThreshold={1}
					ListEmptyComponent={
						isPlaceholderData ? (
							<ActivityIndicator
								color={theme.primary}
								accessibilityLabel="Searching characters"
							/>
						) : (
							<View style={styles.galleryEmpty}>
								<Text style={styles.text}>No characters found for “{search}”.</Text>
								<Text style={styles.characterDetail}>
									Check the spelling or try a shorter name.
								</Text>

								<Pressable
									style={styles.button}
									onPress={onClearSearch}
									accessibilityRole="button"
								>
									<Text style={styles.buttonText}>Clear search</Text>
								</Pressable>
							</View>
						)
					}
					ListFooterComponent={
						<View style={styles.galleryFooter}>
							{isPaused && hasNextPage && (
								<OfflineNotice message="More characters load as soon as you’re back online." />
							)}

							{isFetchingNextPage && (
								<ActivityIndicator
									color={theme.primary}
									accessibilityLabel="Loading more characters"
								/>
							)}

							{isFetchNextPageError && !isFetchingNextPage && (
								<ErrorMessage
									message="Could not load more characters."
									onRetry={() => fetchNextPage()}
								/>
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

				{isScrolled && <View style={styles.galleryDivider} />}

				<ScrollTopButton visible={showScrollTop} onPress={scrollToTop} />
			</View>
		</View>
	);
}
