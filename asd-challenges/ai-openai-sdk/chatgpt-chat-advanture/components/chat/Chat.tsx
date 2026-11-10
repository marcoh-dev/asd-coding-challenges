"use client";

import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import { sendChat, streamChat } from "../../app/actions";
import type { Message } from "../../types/Chat.schema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ChatSidebar } from "./ChatSidebar";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { createChat, getChatTitle, type Chat } from "./chat-utils";

export default function Chat() {
	const [chats, setChats] = useLocalStorageState<Chat[]>("adventure-chats", {
		defaultValue: [createChat()],
	});

	const [activeChatId, setActiveChatId] = useLocalStorageState<string>(
		"active-adventure-chat-id",
		{
			defaultValue: "",
		},
	);

	const [followups, setFollowups] = useState<string[]>([]);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (!hydrated || chats.length === 0) return;

		const activeChatExists = chats.some((chat) => chat.id === activeChatId);

		if (!activeChatExists) {
			setActiveChatId(chats[0].id);
		}
	}, [hydrated, chats, activeChatId, setActiveChatId]);

	const activeChat = chats.find((chat) => chat.id === activeChatId) ?? null;

	function updateChatMessages(chatId: string, messages: Message[]) {
		setChats((currentChats) =>
			currentChats.map((chat) => (chat.id === chatId ? { ...chat, messages } : chat)),
		);
	}

	function handleNewChat() {
		const newChat = createChat();

		setChats((currentChats) => [...currentChats, newChat]);

		setActiveChatId(newChat.id);
	}

	function handleDeleteChat(chatId: string) {
		const remainingChats = chats.filter((chat) => chat.id !== chatId);

		if (remainingChats.length === 0) {
			const newChat = createChat();

			setChats([newChat]);
			setActiveChatId(newChat.id);

			return;
		}

		setChats(remainingChats);

		if (chatId === activeChatId) {
			setActiveChatId(remainingChats[0].id);
		}
	}

	async function handleSubmit(content: string, streaming: boolean) {
		if (!activeChat) return;

		setFollowups([]);

		const userMessage: Message = {
			role: "user",
			content,
		};

		const updatedMessages = [...activeChat.messages, userMessage];

		updateChatMessages(activeChat.id, updatedMessages);

		if (!streaming) {
			const assistantResponse = await sendChat(updatedMessages);

			const assistantMessage: Message = {
				role: "assistant",
				content: assistantResponse.reply,
			};

			updateChatMessages(activeChat.id, [...updatedMessages, assistantMessage]);

			setFollowups(assistantResponse.followups);

			return;
			// const assistantMessage = await sendChat(updatedMessages);
			// updateChatMessages(activeChat.id, [...updatedMessages, assistantMessage]);
			// return;
		}

		const stream = await streamChat(updatedMessages);

		const reader = stream.getReader();

		let assistantText = "";

		updateChatMessages(activeChat.id, [
			...updatedMessages,
			{
				role: "assistant",
				content: "",
			},
		]);

		while (true) {
			const { value, done } = await reader.read();

			if (done) break;

			assistantText += value;

			updateChatMessages(activeChat.id, [
				...updatedMessages,
				{
					role: "assistant",
					content: assistantText,
				},
			]);
		}
	}

	if (!hydrated) {
		return null;
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
			<Card className="flex h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col-reverse overflow-hidden rounded-3xl shadow-sm md:flex-row">
				{/* Sidebar */}
				<ChatSidebar
					chats={chats}
					activeChatId={activeChatId}
					onSelectChat={setActiveChatId}
					onNewChat={handleNewChat}
					onDeleteChat={handleDeleteChat}
				/>

				{/* Main chat area */}
				<div className="flex min-h-0 min-w-0 flex-1 flex-col">
					<CardHeader className="shrink-0 border-b px-6 py-5">
						<CardTitle className="truncate text-lg">
							{activeChat ? getChatTitle(activeChat) : "Chat"}
						</CardTitle>
					</CardHeader>

					<CardContent className="flex min-h-0 flex-1 flex-col gap-4 p-4">
						<ChatMessages
							chatId={activeChat?.id ?? ""}
							messages={activeChat?.messages ?? []}
							followups={followups}
							onFollowupClick={(followup) => handleSubmit(followup, false)}
						/>
						<ChatInput onSubmit={handleSubmit} />
					</CardContent>
				</div>
			</Card>
		</div>
	);
}
