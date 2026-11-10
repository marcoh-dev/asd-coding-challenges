import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "expo-router";
import { useHeaderHeight, usePreventRemove } from "expo-router/react-navigation";
import { useState } from "react";
import { Controller, useForm, useFormState, useWatch } from "react-hook-form";
import {
	AccessibilityInfo,
	Alert,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	View,
} from "react-native";

import CharacterImage from "@/components/CharacterImage";
import FormField from "@/components/FormField";
import HeaderTextButton from "@/components/HeaderTextButton";
import OptionSelector from "@/components/OptionSelector";
import {
	type CharacterFormOutput,
	characterFormSchema,
	type CharacterFormValues,
} from "@/schemas/characterForm";
import { useTheme } from "@/theme/ThemeProvider";
import type { CharacterInput } from "@/types/character";

const statusOptions = [
	{ value: "Alive", label: "Alive" },
	{ value: "Dead", label: "Dead" },
	{ value: "unknown", label: "Unknown" },
] as const;

const genderOptions = [
	{ value: "unknown", label: "Unknown" },
	{ value: "Female", label: "Female" },
	{ value: "Male", label: "Male" },
	{ value: "Genderless", label: "Genderless" },
] as const;

type Props = {
	defaultValues: CharacterFormValues;
	submitLabel: string;
	submitAccessibilityLabel: string;
	isSubmitting: boolean;
	onSubmit: (input: CharacterInput, allowLeave: () => void) => void;
};

export default function CharacterForm({
	defaultValues,
	submitLabel,
	submitAccessibilityLabel,
	isSubmitting,
	onSubmit,
}: Props) {
	const { styles } = useTheme();
	const headerHeight = useHeaderHeight();

	const { control, handleSubmit, setFocus } = useForm<
		CharacterFormValues,
		unknown,
		CharacterFormOutput
	>({
		resolver: zodResolver(characterFormSchema),
		defaultValues,
		mode: "onTouched",
	});

	const image = useWatch({ control, name: "image" });
	const { isDirty } = useFormState({ control });

	const [isLeaving, setIsLeaving] = useState(false);

	const disablePrevention = usePreventRemove(isDirty && !isLeaving, ({ repeat }) => {
		Alert.alert("Discard changes?", "Your changes haven’t been saved.", [
			{ text: "Keep editing", style: "cancel" },
			{
				text: "Discard",
				style: "destructive",
				onPress: () => {
					setIsLeaving(true);
					repeat();
				},
			},
		]);
	});

	function allowLeave() {
		setIsLeaving(true);
		disablePrevention();
	}
	const hasImagePreview =
		image !== "" && characterFormSchema.shape.image.safeParse(image).success;

	const validateAndSubmit = handleSubmit(
		({ origin, location, ...values }) =>
			onSubmit(
				{ ...values, origin: { name: origin }, location: { name: location } },
				allowLeave,
			),
		() => AccessibilityInfo.announceForAccessibility("Please check the highlighted fields"),
	);

	function submit() {
		if (!isSubmitting) {
			void validateAndSubmit();
		}
	}

	return (
		<KeyboardAvoidingView
			style={styles.form}
			behavior="padding"
			keyboardVerticalOffset={headerHeight}
		>
			<Stack.Screen
				options={{
					headerRight: () => (
						<HeaderTextButton
							label={submitLabel}
							accessibilityLabel={submitAccessibilityLabel}
							isBusy={isSubmitting}
							onPress={submit}
						/>
					),
				}}
			/>

			<ScrollView
				contentContainerStyle={styles.formContent}
				keyboardShouldPersistTaps="handled"
			>
				<Controller
					control={control}
					name="name"
					render={({ field, fieldState }) => (
						<FormField
							ref={field.ref}
							label="Name"
							value={field.value}
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							error={fieldState.error?.message}
							placeholder="Rick Sanchez"
							autoCapitalize="words"
							returnKeyType="next"
							submitBehavior="submit"
							onSubmitEditing={() => setFocus("species")}
						/>
					)}
				/>

				<Controller
					control={control}
					name="status"
					render={({ field }) => (
						<View>
							<Text style={styles.formLabel}>Status</Text>
							<OptionSelector
								options={statusOptions}
								value={field.value}
								onChange={field.onChange}
								accessibilityLabel="Status"
							/>
						</View>
					)}
				/>

				<Controller
					control={control}
					name="species"
					render={({ field, fieldState }) => (
						<FormField
							ref={field.ref}
							label="Species"
							value={field.value}
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							error={fieldState.error?.message}
							placeholder="Human"
							autoCapitalize="words"
							returnKeyType="next"
							submitBehavior="submit"
							onSubmitEditing={() => setFocus("type")}
						/>
					)}
				/>

				<Controller
					control={control}
					name="type"
					render={({ field, fieldState }) => (
						<FormField
							ref={field.ref}
							label="Type (optional)"
							value={field.value}
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							error={fieldState.error?.message}
							placeholder="Clone"
							autoCapitalize="words"
							returnKeyType="next"
							submitBehavior="submit"
							onSubmitEditing={() => setFocus("origin")}
						/>
					)}
				/>

				<Controller
					control={control}
					name="gender"
					render={({ field }) => (
						<View>
							<Text style={styles.formLabel}>Gender</Text>
							<OptionSelector
								options={genderOptions}
								value={field.value}
								onChange={field.onChange}
								accessibilityLabel="Gender"
							/>
						</View>
					)}
				/>

				<Controller
					control={control}
					name="origin"
					render={({ field, fieldState }) => (
						<FormField
							ref={field.ref}
							label="Origin (optional)"
							value={field.value}
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							error={fieldState.error?.message}
							placeholder="unknown"
							autoCapitalize="words"
							returnKeyType="next"
							submitBehavior="submit"
							onSubmitEditing={() => setFocus("location")}
						/>
					)}
				/>

				<Controller
					control={control}
					name="location"
					render={({ field, fieldState }) => (
						<FormField
							ref={field.ref}
							label="Location (optional)"
							value={field.value}
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							error={fieldState.error?.message}
							placeholder="unknown"
							autoCapitalize="words"
							returnKeyType="next"
							submitBehavior="submit"
							onSubmitEditing={() => setFocus("image")}
						/>
					)}
				/>

				<Controller
					control={control}
					name="image"
					render={({ field, fieldState }) => (
						<FormField
							ref={field.ref}
							label="Image URL (optional)"
							value={field.value}
							onChangeText={field.onChange}
							onBlur={field.onBlur}
							error={fieldState.error?.message}
							placeholder="https://…"
							inputMode="url"
							autoCapitalize="none"
							autoCorrect={false}
							returnKeyType="done"
							onSubmitEditing={submit}
						/>
					)}
				/>

				{hasImagePreview && (
					<CharacterImage
						uri={image}
						style={styles.formImagePreview}
						iconSize={48}
						accessibilityLabel="Image preview"
					/>
				)}
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
