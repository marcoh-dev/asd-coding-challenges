import { useState } from "react";
import { View } from "react-native";

import Gallery from "@/components/Gallery";
import SearchInput from "@/components/SearchInput";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useTheme } from "@/theme/ThemeProvider";

const SEARCH_DELAY = 300;

export default function GalleryScreen() {
	const { styles } = useTheme();
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebouncedValue(search.trim(), SEARCH_DELAY);

	return (
		<View style={styles.container}>
			<SearchInput value={search} onChangeText={setSearch} />
			<Gallery search={debouncedSearch} />
		</View>
	);
}
