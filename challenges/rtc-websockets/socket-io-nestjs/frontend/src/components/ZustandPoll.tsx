import { useEffect } from "react";
import { usePollStore } from "./pollStore";

export function ZustandPoll({ pollId }: { pollId: string }) {
	//const results = usePollStore((s) => s.results);

	const results = usePollStore((s) => s.results[pollId]);

	const connected = usePollStore((s) => s.connected);
	const joinPoll = usePollStore((s) => s.joinPoll);
	const vote = usePollStore((s) => s.vote);

	useEffect(() => {
		joinPoll(pollId);
	}, [pollId, joinPoll]);

	return (
		<div>
			<span>{!connected && "Reconnecting..."}</span>
			<button onClick={() => vote(pollId, "pizza")}>Pizza</button>
			<button onClick={() => vote(pollId, "pasta")}>Pasta</button>
			<pre>{JSON.stringify(results ?? {}, null, 2)}</pre>
		</div>
	);
}
