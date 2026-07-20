import { orderTotal, formatOrder } from "./customerData.js";
import { isInStock } from "./shopData.js";
import type { Customer, Order } from "./customerData.js";
import type { Category, Product } from "./shopData.js";

/*
Online Shop

A small online shop sells products organised into categories. Customers place orders. Each order contains one or more line items.

Design the TypeScript type system for this shop from scratch. Requirements:

    A product has a name, a price in euros, and a stock count. Its id must never be reassigned after creation.
    Products belong to a category. A category has a name and an optional description.
    A customer has an id, name, and email.
    An order links a customer to a list of line items. Each line item references a product and a quantity. Orders carry a status of either "pending", "confirmed", or "shipped".

Implement at least these three functions:

    orderTotal(order: Order): number — the total price across all line items
    formatOrder(order: Order): string — a readable summary of the order
    isInStock(product: Product): boolean — whether the product has stock available

Split the code across at least three files. Use strict mode. The project must compile without errors and log meaningful output when the entry point runs.
*/

const category1: Category = {
	name: "Electronics",
	description: "Devices and gadgets",
};

const category2: Category = {
	name: "Books",
	description: "Printed and digital books",
};

const category3: Category = {
	name: "Office",
};

const product1: Product = {
	id: 1,
	name: "Wireless Mouse",
	price: 29.99,
	stock: 50,
	category: category1,
};

const product2: Product = {
	id: 2,
	name: "TypeScript Handbook",
	price: 39.95,
	stock: 0,
	category: category2,
};

const product3: Product = {
	id: 3,
	name: "Notebook",
	price: 4.99,
	stock: 100,
	category: category3,
};

const customer1: Customer = {
	id: 1,
	name: "Alice Johnson",
	email: "alice@example.com",
};

const customer2: Customer = {
	id: 2,
	name: "Bob Smith",
	email: "bob@example.com",
};

const customer3: Customer = {
	id: 3,
	name: "Charlie Brown",
	email: "charlie@example.com",
};

const order1: Order = {
	customer: customer1,
	lineItems: [
		{
			product: product1,
			quantity: 2,
		},
		{
			product: product3,
			quantity: 5,
		},
	],
	status: "pending",
};

const order2: Order = {
	customer: customer2,
	lineItems: [
		{
			product: product2,
			quantity: 1,
		},
	],
	status: "confirmed",
};

const order3: Order = {
	customer: customer3,
	lineItems: [
		{
			product: product1,
			quantity: 1,
		},
		{
			product: product2,
			quantity: 2,
		},
		{
			product: product3,
			quantity: 10,
		},
	],
	status: "shipped",
};

console.log(orderTotal(order1));
console.log(orderTotal(order2));
console.log(orderTotal(order3));

console.log(formatOrder(order1));
console.log(formatOrder(order2));
console.log(formatOrder(order3));

console.log(isInStock(product1));
console.log(isInStock(product2));
console.log(isInStock(product3));

function differenceOfTwo(arr: number[]): number[][] {
	const sortedInput = arr.sort(function (a, b) {
		return a - b;
	});
	const pairs: number[][] = [];
	for (let i = 0; i < sortedInput.length; i++) {
		if (sortedInput.includes(sortedInput[i] + 2)) {
			pairs.push([sortedInput[i], sortedInput[i] + 2]);
		}
	}

	return pairs;
}

console.log(differenceOfTwo([1, 2, 3, 4]), [
	[1, 3],
	[2, 4],
]);
console.log(differenceOfTwo([4, 1, 2, 3]), [
	[1, 3],
	[2, 4],
]);
console.log(differenceOfTwo([1, 23, 3, 4, 7]), [[1, 3]]);
console.log(differenceOfTwo([4, 3, 1, 5, 6]), [
	[1, 3],
	[3, 5],
	[4, 6],
]);
console.log(differenceOfTwo([1, 5, 10]), []);
