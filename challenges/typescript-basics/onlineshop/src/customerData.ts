import type { Product } from "./shopData.js";

export type Customer = {
	id: number;
	name: string;
	email: string;
};

export type Order = {
	customer: Customer;
	lineItems: {
		product: Product;
		quantity: number;
	}[];
	status: "pending" | "confirmed" | "shipped";
};

// the total price across all line items
export function orderTotal(order: Order): number {
	let total = 0;

	order.lineItems.forEach((lineItem) => {
		total += lineItem.product.price * lineItem.quantity;
	});

	return Math.round(total * 100) / 100;
}

// a readable summary of the order
export function formatOrder(order: Order): string {
	return `${order.customer.name} ordered ${order.lineItems.map((item) => `${item.quantity}× ${item.product.name}`).join(", ")} (status: ${order.status})`;
}
