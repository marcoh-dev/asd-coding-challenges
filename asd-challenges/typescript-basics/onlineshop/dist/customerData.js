// the total price across all line items
export function orderTotal(order) {
    let total = 0;
    order.lineItems.forEach((lineItem) => {
        total += lineItem.product.price * lineItem.quantity;
    });
    return Math.round(total * 100) / 100;
}
// a readable summary of the order
export function formatOrder(order) {
    return `${order.customer.name} ordered ${order.lineItems.map((item) => `${item.quantity}× ${item.product.name}`).join(", ")} (status: ${order.status})`;
}
//# sourceMappingURL=customerData.js.map