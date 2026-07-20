export type Product = {
	readonly id: number;
	name: string;
	price: number;
	stock: number;
	category: Category;
};

export type Category = {
	name: string;
	description?: string;
};

// whether the product has stock available
export function isInStock(product: Product): boolean {
	return product.stock > 0;
}
