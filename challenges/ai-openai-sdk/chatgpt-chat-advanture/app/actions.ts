"use server";

import openai from "@/lib/openai";
import { ChatResponseSchema, MessageSchema, type Message } from "../types/Chat.schema";
import OpenAI from "openai";

const systemMessage: Message = {
	role: "system",
	content: `
You are a friendly adventure game assistant.

Help the user explore a fantasy adventure world and respond to their actions.

Your response must be structured as:
- reply: your response to the user's message
- followups: short suggestions for what the user could ask or do next

Each followup should be written from the user's perspective and should make sense when submitted directly as a user message.

For example:
- "What can I find in the forest?"
- "I want to explore the cave."
- "Can I talk to the merchant?"

Do not write followups as questions that the assistant should answer internally. They must be messages that the user could send directly.
`,
};

const responseFormat: OpenAI.Chat.Completions.ChatCompletionCreateParams["response_format"] = {
	type: "json_schema",
	json_schema: {
		name: "chat_response",
		strict: true,
		schema: {
			type: "object",
			properties: {
				reply: { type: "string" },
				followups: { type: "array", items: { type: "string" } },
			},
			required: ["reply", "followups"],
			additionalProperties: false,
		},
	},
};

const temperature = 0.5;
const maxTokens = 300;

export async function sendChat(messages: Message[]) {
	const completion = await openai.chat.completions.create({
		model: process.env.OPENAI_MODEL!,
		messages: [systemMessage, ...messages],
		temperature,
		max_tokens: maxTokens,
		response_format: responseFormat,
	});

	const raw = completion.choices[0]?.message.content ?? "{}";

	if (!raw) {
		throw new Error("OpenAI returned an empty response");
	}

	const reply = ChatResponseSchema.parse(JSON.parse(raw));
	return reply;
}

export async function streamChat(messages: Message[]) {
	const stream = await openai.chat.completions.create({
		model: process.env.OPENAI_MODEL!,
		messages: [{ role: "system", content: "systemPrompt" }, ...messages],
		stream: true,
	});

	return new ReadableStream({
		async start(controller) {
			try {
				for await (const chunk of stream) {
					const token = chunk.choices[0].delta.content ?? "";
					controller.enqueue(token);
				}
				controller.close();
			} catch (error) {
				controller.error(error);
			}
		},
	});
}
