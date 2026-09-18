import "./App.css";
import { Poll } from "./components/Poll";
import { ZustandPoll } from "./components/ZustandPoll";

function App() {
	return (
		<>
			<ul>
				<li>
					<p>Poll (id 1):</p>
					<Poll pollId="poll-1" />
				</li>
				<li>
					<p>Zustand Poll (id 1):</p>
					<ZustandPoll pollId="poll-1" />
				</li>
				<li>
					<p>Poll (id 2):</p>
					<Poll pollId="poll-2" />
				</li>
				<li>
					<p>Zustand Poll (id 3):</p>
					<ZustandPoll pollId="poll-3" />
				</li>
			</ul>
		</>
	);
}

export default App;
