"use server";

import { MessageSchema, type Message } from "../types/Chat.schema";

export async function sendChat(messages: Message[]): Promise<Message> {
	const openaiResponse = await fetch(process.env.OPENAI_API_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			model: process.env.OPENAI_MODEL,
			messages,
		}),
	});

	if (!openaiResponse.ok) {
		throw new Error(`OpenAI API error: ${openaiResponse.status}`);
	}

	const data = await openaiResponse.json();

	const message = MessageSchema.parse(data.choices?.[0]?.message);

	return message;
}

export async function streamChat(messages: Message[]) {
	const openaiResponse = await fetch(process.env.OPENAI_API_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({ model: process.env.OPENAI_MODEL, messages, stream: true }),
	});

	if (!openaiResponse.ok) {
		throw new Error(`OpenAI API error: ${openaiResponse.status}`);
	}

	if (!openaiResponse.body) {
		throw new Error("OpenAI response body is empty");
	}

	const responseBody = openaiResponse.body;

	return new ReadableStream({
		async start(controller) {
			const reader = responseBody.getReader();
			const decoder = new TextDecoder();
			let buffer = "";

			while (true) {
				const { value, done } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split("\n");
				buffer = lines.pop() ?? "";

				for (const line of lines) {
					if (!line.startsWith("data:")) continue;
					const data = line.replace("data:", "").trim();
					if (data === "[DONE]") continue;

					const token = JSON.parse(data).choices[0].delta.content;
					if (token) controller.enqueue(token);
				}
			}
			controller.close();
		},
	});
}
