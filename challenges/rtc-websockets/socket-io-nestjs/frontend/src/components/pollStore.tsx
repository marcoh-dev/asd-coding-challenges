import { create } from "zustand";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { autoConnect: false });

type PollResults = Record<string, number>;

/*
type PollState = {
	results: Record<string, number>;
	connected: boolean;
	pollId: string | null;
	joinPoll: (pollId: string) => void;
	vote: (option: string) => void;
};
*/

type PollState = {
	results: Record<string, PollResults>;
	connected: boolean;
	joinPoll: (pollId: string) => void;
	vote: (pollId: string, option: string) => void;
};

export const usePollStore = create<PollState>()((set) => {
	// Registered once, because the store is created once.
	socket.on("connect", () => {
		set({ connected: true });
		//const { pollId } = get();
		//if (pollId) socket.emit("joinPoll", pollId); // re-join on every (re)connection
	});
	socket.on("disconnect", () => set({ connected: false }));
	/*
	socket.on("results", (results: Record<string, number>) => set({ results }));
	*/
	socket.on("results", (data: { pollId: string; results: PollResults }) => {
		set((state) => ({
			results: {
				...state.results,
				[data.pollId]: data.results,
			},
		}));
	});

	/*
	return {
		results: {},
		connected: false,
		pollId: null,

		joinPoll: (pollId) => {
			set({ pollId });
			if (socket.connected) {
				socket.emit("joinPoll", pollId);
			} else {
				socket.connect();
			}
		},

		vote: (option) => socket.emit("vote", { pollId: get().pollId, option }),
	};
	*/

	return {
		results: {},
		connected: false,

		joinPoll: (pollId) => {
			set((state) => ({
				results: {
					...state.results,
					[pollId]: state.results[pollId] ?? {},
				},
			}));

			if (!socket.connected) {
				socket.connect();
			}

			socket.emit("joinPoll", pollId);
		},

		/*
		joinPoll: (pollId) => {
			if (!socket.connected) {
				socket.connect();
			}

			socket.emit("joinPoll", pollId);
		},
		*/

		vote: (pollId, option) => {
			socket.emit("vote", { pollId, option });
		},
	};
});
