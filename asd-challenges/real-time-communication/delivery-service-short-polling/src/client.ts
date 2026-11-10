import type { OrderStatus } from "./server.js";

const orderId = "1";
const POLL_INTERVAL_IN_MS = 3000;

function startPolling(orderId: string) {
	let status: OrderStatus;

	async function poll() {
		const response = await fetch(`/api/orders/${orderId}`);
		const order: { status: OrderStatus } = await response.json();

		if (status === order.status) {
			console.log("Server says: no status change");
		} else {
			console.log("Server says:", order.status);
			status = order.status;
			const statusElement = document.querySelector("#status");

			if (statusElement) {
				statusElement.textContent = order.status;
			}
		}

		if (order.status === "delivered") {
			console.log("Order delivered. Stopped polling.");
			return;
		}

		setTimeout(poll, POLL_INTERVAL_IN_MS);
	}

	poll();
}

startPolling(orderId);
