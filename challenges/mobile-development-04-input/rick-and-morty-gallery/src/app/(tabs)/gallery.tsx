import { useRef, useState } from "react";
import { AccessibilityInfo, type TextInputInstance, View } from "react-native";

import Gallery from "@/components/Gallery";
import SearchInput from "@/components/SearchInput";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useTheme } from "@/theme/ThemeProvider";

const SEARCH_DELAY = 300;

export default function GalleryScreen() {
	const { styles } = useTheme();
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebouncedValue(search.trim(), search ? SEARCH_DELAY : 0);
	const inputRef = useRef<TextInputInstance>(null);

	function clearSearch() {
		setSearch("");

		if (inputRef.current) {
			inputRef.current.focus();
			AccessibilityInfo.sendAccessibilityEvent(inputRef.current, "focus");
		}
	}

	return (
		<View style={styles.container}>
			<SearchInput
				ref={inputRef}
				value={search}
				onChangeText={setSearch}
				onClear={clearSearch}
			/>
			<Gallery search={debouncedSearch} onClearSearch={clearSearch} />
		</View>
	);
}
