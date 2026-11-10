import { z } from "zod";

import type { Character } from "@/types/character";

export const characterStatuses = ["Alive", "Dead", "unknown"] as const;
export const characterGenders = ["Female", "Male", "Genderless", "unknown"] as const;

const MAX_LENGTH = 100;

function requiredText(label: string) {
	return z
		.string()
		.trim()
		.min(1, `${label} is required`)
		.max(MAX_LENGTH, `${label} can have at most ${MAX_LENGTH} characters`);
}

function optionalPlace(label: string) {
	return z
		.string()
		.trim()
		.max(MAX_LENGTH, `${label} can have at most ${MAX_LENGTH} characters`)
		.transform((value) => value || "unknown");
}

export const characterFormSchema = z.object({
	name: requiredText("Name"),
	status: z.enum(characterStatuses),
	species: requiredText("Species"),
	type: z.string().trim().max(MAX_LENGTH, `Type can have at most ${MAX_LENGTH} characters`),
	gender: z.enum(characterGenders),
	origin: optionalPlace("Origin"),
	location: optionalPlace("Location"),
	image: z.union([
		z.literal(""),
		z.url({
			protocol: /^https?$/,
			error: "Enter an image URL starting with http:// or https://",
		}),
	]),
});

export type CharacterFormValues = z.input<typeof characterFormSchema>;
export type CharacterFormOutput = z.output<typeof characterFormSchema>;

export const emptyCharacterForm: CharacterFormValues = {
	name: "",
	status: "Alive",
	species: "",
	type: "",
	gender: "unknown",
	origin: "",
	location: "",
	image: "",
};

function toPlaceField(name: string) {
	return name === "unknown" ? "" : name;
}

export function toCharacterForm(character: Character): CharacterFormValues {
	return {
		name: character.name,
		status: character.status,
		species: character.species,
		type: character.type,
		gender: character.gender,
		origin: toPlaceField(character.origin.name),
		location: toPlaceField(character.location.name),
		image: character.image,
	};
}
