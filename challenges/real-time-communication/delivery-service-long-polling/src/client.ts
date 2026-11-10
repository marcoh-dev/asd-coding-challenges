import type { OrderStatus } from "./server.js";

const orderId = "1";
const POLL_INTERVAL_IN_MS = 3000;

async function waitForUpdate(orderId: string, since: string) {
	const response = await fetch(`/api/orders/${orderId}?since=${since}`);

	if (response.status === 204) {
		console.log("Server says: no status change");
		waitForUpdate(orderId, since);
		return;
	}

	const order: { status: OrderStatus } = await response.json();
	console.log("Server says:", order.status);
	const statusElement = document.querySelector("#status");

	if (statusElement) {
		statusElement.textContent = order.status;
	}

	if (order.status === "delivered") {
		console.log("Order delivered. Stopped polling.");
		return;
	}

	waitForUpdate(orderId, order.status);
}

waitForUpdate(orderId, "");
