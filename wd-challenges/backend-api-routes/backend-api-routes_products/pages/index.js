import useSWR from "swr";
import Link from "next/link";

export default function HomePage() {
	const { data: products, error, isLoading } = useSWR("/api/products");
	if (error) {
		console.error("ERROR!", error.info);
		return (
			<div>
				<p>{error.message}</p>
				<p>Status: {error.status}</p>
			</div>
		);
	}

	if (isLoading || !products)
		return (
			<div>
				<p>loading...</p>
			</div>
		);

	return (
		<div>
			<h1>All Products</h1>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						<Link href={`/products/${product.id}`}>
							{product.name} - {product.description}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
