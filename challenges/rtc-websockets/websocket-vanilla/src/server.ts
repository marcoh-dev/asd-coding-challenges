import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const PORT = 3000;
const server = app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});

app.use(express.static("static"));

const wss = new WebSocketServer({ server });

wss.on("connection", (socket: WebSocket) => {
	socket.on("message", (data) => {
		// relay the message to every connected client
		for (const client of wss.clients) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data.toString());
			}
		}
	});
});
