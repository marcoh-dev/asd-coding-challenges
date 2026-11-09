import { z } from "zod";

export const envSchema = z.object({
	PORT: z.coerce.number().int().positive().default(3000),
	DB_FILE: z.string().min(1).default("data/characters.sqlite"),
});

export type Env = z.infer<typeof envSchema>;
