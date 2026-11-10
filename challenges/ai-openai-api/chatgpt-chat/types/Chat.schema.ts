// Chat.schema.ts
import { z } from "zod";

export const RoleSchema = z.enum(["user", "assistant"]);

export const MessageSchema = z.object({
	role: RoleSchema,
	content: z.string(),
});

export type Role = z.infer<typeof RoleSchema>;
export type Message = z.infer<typeof MessageSchema>;
