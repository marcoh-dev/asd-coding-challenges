"use client";

import type { Message } from "../../types/Chat.schema";

import {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
} from "@/components/ui/message-scroller";

type ChatMessagesProps = {
	chatId: string;
	messages: Message[];
};

export function ChatMessages({ chatId, messages }: ChatMessagesProps) {
	return (
		<MessageScrollerProvider autoScroll defaultScrollPosition="last-anchor">
			<MessageScroller className="min-h-0 flex-1">
				<MessageScrollerViewport>
					<MessageScrollerContent className="space-y-4 px-2">
						{messages.map((message, index) => {
							const isUser = message.role === "user";

							return (
								<MessageScrollerItem
									key={`${chatId}-${index}`}
									messageId={`${chatId}-${index}`}
									scrollAnchor={isUser}
								>
									<div
										className={`flex items-end gap-2 ${
											isUser ? "justify-end" : "justify-start"
										}`}
									>
										{!isUser && (
											<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-lg">
												🤖
											</div>
										)}

										<div
											className={`max-w-[80%] rounded-2xl px-4 py-3 ${
												isUser
													? "rounded-br-md bg-primary text-primary-foreground"
													: "rounded-bl-md bg-muted"
											}`}
										>
											<p className="whitespace-pre-wrap text-sm leading-relaxed">
												{message.content}
											</p>
										</div>

										{isUser && (
											<div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg">
												👤
											</div>
										)}
									</div>
								</MessageScrollerItem>
							);
						})}
					</MessageScrollerContent>
				</MessageScrollerViewport>

				<MessageScrollerButton direction="end" />
			</MessageScroller>
		</MessageScrollerProvider>
	);
}
