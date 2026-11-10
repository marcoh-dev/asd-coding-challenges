import type { Ref } from "react";
import { Text, TextInput, type TextInputInstance, type TextInputProps, View } from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

type Props = TextInputProps & {
	ref?: Ref<TextInputInstance>;
	label: string;
	error?: string;
};

export default function FormField({ ref, label, error, ...inputProps }: Props) {
	const { theme, styles } = useTheme();

	return (
		<View style={styles.formField}>
			<Text style={styles.formLabel}>{label}</Text>

			<TextInput
				ref={ref}
				style={[styles.formInput, error && styles.formInputError]}
				placeholderTextColor={theme.textSecondary}
				selectionColor={theme.primary}
				accessibilityLabel={error ? `${label}, ${error}` : label}
				{...inputProps}
			/>

			{error && <Text style={styles.formError}>{error}</Text>}
		</View>
	);
}
