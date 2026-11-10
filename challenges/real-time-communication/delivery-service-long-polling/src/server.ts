import express from "express";
import path from "path";

export type OrderStatus = "preparing" | "out-for-delivery" | "delivered";

type Order = {
	id: string;
	status: OrderStatus;
};

const app = express();

app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.static(path.join(process.cwd(), "dist")));

const PORT = 3000;

const order: Order = {
	id: "1",
	status: "preparing",
};

const orders = new Map<string, Order>();
orders.set(order.id, order);

setTimeout(() => {
	order.status = "out-for-delivery";
	console.log("Order is now out for delivery");
}, 8000);

setTimeout(() => {
	order.status = "delivered";
	console.log("Order has been delivered");
}, 16000);

app.get("/api/orders/:id", (req, res) => {
	const order = orders.get(req.params.id);

	if (!order) {
		res.status(404).json({
			error: "Order not found",
		});
		return;
	}

	res.json(order);
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
	console.log(`Order ID: ${order.id}`);
});
