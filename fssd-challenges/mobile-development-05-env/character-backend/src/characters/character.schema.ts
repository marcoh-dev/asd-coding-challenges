import { z } from "zod";

export const characterStatuses = ["Alive", "Dead", "unknown"] as const;
export const characterGenders = ["Female", "Male", "Genderless", "unknown"] as const;

const textSchema = z.string().trim().min(1).max(100);
const placeSchema = z.strictObject({ name: textSchema });

export const characterInputSchema = z.strictObject({
	name: textSchema,
	status: z.enum(characterStatuses),
	species: textSchema,
	type: z.string().trim().max(100).default(""),
	gender: z.enum(characterGenders),
	origin: placeSchema,
	location: placeSchema,
	image: z.union([z.url({ protocol: /^https?$/ }), z.literal("")]).default(""),
});

export const characterListQuerySchema = z.object({
	page: z.coerce.number().int().positive().default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	name: z.string().trim().max(100).default(""),
});

export const characterIdSchema = z.coerce.number().int().positive();

export type CharacterStatus = (typeof characterStatuses)[number];
export type CharacterGender = (typeof characterGenders)[number];
export type CharacterInput = z.infer<typeof characterInputSchema>;
export type CharacterListQuery = z.infer<typeof characterListQuerySchema>;
