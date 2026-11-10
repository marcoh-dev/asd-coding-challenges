// Chat.schema.ts
import { z } from "zod";

export const RoleSchema = z.enum(["system", "user", "assistant"]);

export const MessageSchema = z.object({
	role: RoleSchema,
	content: z.string(),
});

export const ChatResponseSchema = z.object({
	reply: z.string(),
	followups: z.array(z.string()),
});

export type Role = z.infer<typeof RoleSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;
