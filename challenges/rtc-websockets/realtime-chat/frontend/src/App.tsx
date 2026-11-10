import { useEffect, useState } from "react";
import { socket } from "./socket";

function App() {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		function handleMessage(text: string) {
			setMessages((current) => [...current, text]);
		}

		socket.connect();
		socket.on("message", handleMessage);

		return () => {
			socket.off("message", handleMessage);
			socket.disconnect();
		};
	}, []);

	function handleSubmit(event: React.SubmitEvent) {
		event.preventDefault();
		console.log(message);

		const text = message.trim();

		if (!text) {
			return;
		}

		socket.emit("message", text);
		setMessage("");
	}

	return (
		<main>
			<h1>Chat</h1>

			<ul>
				{messages.map((message, index) => (
					<li key={index}>{message}</li>
				))}
			</ul>

			<form onSubmit={handleSubmit}>
				<input
					value={message}
					onChange={(event) => setMessage(event.target.value)}
					placeholder="Message..."
				/>

				<button type="submit">Send</button>
			</form>
		</main>
	);
}

export default App;
