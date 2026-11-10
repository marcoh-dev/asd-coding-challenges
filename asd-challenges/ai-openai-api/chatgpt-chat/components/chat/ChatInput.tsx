"use client";

import { useState, type SubmitEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatInputProps = {
	onSubmit: (message: string, streaming: boolean) => void;
	disabled?: boolean;
};

export function ChatInput({ onSubmit, disabled = false }: ChatInputProps) {
	const [input, setInput] = useState("");
	const [streaming, setStreaming] = useState(true);

	function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const message = input.trim();

		if (!message || disabled) {
			return;
		}

		onSubmit(message, streaming);
		setInput("");
	}

	return (
		<form className="border-t pt-4" onSubmit={handleSubmit}>
			<div className="flex gap-2">
				<Input
					value={input}
					onChange={(event) => setInput(event.target.value)}
					placeholder="Type a message..."
					disabled={disabled}
					className="h-11 rounded-full px-5"
				/>

				<Button
					type="submit"
					size="lg"
					disabled={!input.trim() || disabled}
					className="h-11 rounded-full px-6"
				>
					{disabled ? "..." : "Send"}
				</Button>
			</div>

			<label className="mt-3 flex cursor-pointer items-center gap-2 px-2 text-sm text-muted-foreground">
				<input
					type="checkbox"
					checked={streaming}
					onChange={(event) => setStreaming(event.target.checked)}
					disabled={disabled}
					className="size-4 accent-primary"
				/>

				<span>Stream response</span>
			</label>
		</form>
	);
}
