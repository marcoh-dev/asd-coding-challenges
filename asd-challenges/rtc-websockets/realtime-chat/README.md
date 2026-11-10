# Real-time Chat

A chat built in stages with a NestJS gateway on Socket.io (`backend/`) and a React client with `socket.io-client` (`frontend/`).

> **Status: unfinished.** Task 1 is done: the client connects once through the shared socket in `frontend/src/socket.ts`, and every message is broadcast to all connected clients. Next: Task 2 (rooms with `server.to(room).emit`), Task 3 (presence), Task 4 (typing indicators with `socket.broadcast`), Task 5 (disconnects, connection state, re-join after reconnect), then the bonus tasks (history of the last 20 messages, username in the handshake, private rooms).

## Run

```bash
cd backend
npm install
npm run start:dev
```

```bash
cd frontend
npm install
npm run dev
```

The gateway runs on http://localhost:3000; open the URL Vite prints in two browser tabs to chat between them.
