import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type Option<T extends string> = {
	value: T;
	label: string;
};

type Props<T extends string> = {
	options: readonly Option<T>[];
	value: T;
	onChange: (value: T) => void;
	accessibilityLabel: string;
};

export default function OptionSelector<T extends string>({
	options,
	value,
	onChange,
	accessibilityLabel,
}: Props<T>) {
	const { theme, styles } = useTheme();

	return (
		<View
			style={styles.optionSelector}
			accessibilityRole="radiogroup"
			accessibilityLabel={accessibilityLabel}
		>
			{options.map((option) => {
				const selected = option.value === value;

				return (
					<Pressable
						key={option.value}
						onPress={() => onChange(option.value)}
						accessibilityRole="radio"
						accessibilityState={{ checked: selected }}
						style={[
							styles.optionButton,
							{ backgroundColor: selected ? theme.primary : "transparent" },
						]}
					>
						<Text
							style={[
								styles.optionText,
								{ color: selected ? theme.background : theme.text },
							]}
						>
							{option.label}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
}
