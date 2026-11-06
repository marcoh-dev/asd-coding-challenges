import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type Option<T extends string> = {
	value: T;
	label: string;
	disabled?: boolean;
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
				const textColor = selected
					? theme.background
					: option.disabled
						? theme.textDisabled
						: theme.text;

				return (
					<Pressable
						key={option.value}
						onPress={() => onChange(option.value)}
						disabled={option.disabled}
						accessibilityRole="radio"
						accessibilityState={{ checked: selected, disabled: option.disabled }}
						style={[
							styles.optionButton,
							{ backgroundColor: selected ? theme.primary : "transparent" },
						]}
					>
						<Text style={[styles.optionText, { color: textColor }]}>
							{option.label}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
}
