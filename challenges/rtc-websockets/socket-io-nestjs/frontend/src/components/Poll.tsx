import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { autoConnect: false });

export function Poll({ pollId }: { pollId: string }) {
	const [results, setResults] = useState<Record<string, number>>({});

	useEffect(() => {
		socket.connect();
		socket.emit("joinPoll", pollId);

		//const onResults = (data: Record<string, number>) => setResults(data);
		const onResults = (data: { pollId: string; results: Record<string, number> }) => {
			if (data.pollId === pollId) {
				setResults(data.results);
			}
		};

		socket.on("results", onResults);

		return () => {
			socket.off("results", onResults);
			socket.disconnect();
		};
	}, [pollId]);

	const vote = (option: string) => socket.emit("vote", { pollId, option });

	return (
		<div>
			<button onClick={() => vote("pizza")}>Pizza</button>
			<button onClick={() => vote("pasta")}>Pasta</button>
			<pre>{JSON.stringify(results, null, 2)}</pre>
		</div>
	);
}
