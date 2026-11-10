import type { Message } from "../../types/Chat.schema";

export type Chat = {
	id: string;
	messages: Message[];
};

export function createChat(): Chat {
	return {
		id: crypto.randomUUID(),
		messages: [],
	};
}

export function getChatTitle(chat: Chat): string {
	const firstUserMessage = chat.messages.find((message) => message.role === "user");

	if (!firstUserMessage) {
		return "New chat";
	}

	const title = firstUserMessage.content.trim();

	if (title.length <= 30) {
		return title;
	}

	return `${title.slice(0, 30)}...`;
}
