"use client";

import type { Chat } from "./chat-utils";
import { getChatTitle } from "./chat-utils";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type ChatSidebarProps = {
	chats: Chat[];
	activeChatId: string;
	onSelectChat: (chatId: string) => void;
	onNewChat: () => void;
	onDeleteChat: (chatId: string) => void;
};

export function ChatSidebar({
	chats,
	activeChatId,
	onSelectChat,
	onNewChat,
	onDeleteChat,
}: ChatSidebarProps) {
	return (
		<aside className="flex h-28 w-full shrink-0 flex-col border-t bg-muted/20 md:h-auto md:w-64 md:border-r md:border-t-0">
			<div className="flex items-center justify-between border-b px-4 py-4">
				<h2 className="font-semibold">Chat Adventures</h2>

				<Button variant="outline" size="sm" onClick={onNewChat}>
					+ New
				</Button>
			</div>

			<div className="flex-1 overflow-y-auto p-2">
				<div className="space-y-1">
					{chats.map((chat) => {
						const isActive = chat.id === activeChatId;

						return (
							<div
								key={chat.id}
								className={`flex items-center gap-1 rounded-lg transition-colors ${
									isActive
										? "bg-primary text-primary-foreground"
										: "hover:bg-muted"
								}`}
							>
								<button
									type="button"
									onClick={() => onSelectChat(chat.id)}
									className="min-w-0 flex-1 truncate px-3 py-2 text-left text-sm"
								>
									{getChatTitle(chat)}
								</button>

								<button
									type="button"
									onClick={() => onDeleteChat(chat.id)}
									className="mr-1 flex size-7 shrink-0 items-center justify-center rounded-md opacity-60 transition-opacity hover:bg-destructive hover:text-destructive-foreground hover:opacity-100"
									aria-label={`Delete ${getChatTitle(chat)}`}
								>
									<Trash2 className="size-4" />
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</aside>
	);
}
