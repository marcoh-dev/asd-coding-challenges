import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

export default function Product() {
	const router = useRouter();
	const { id } = router?.query;

	const { data: product, error, isLoading } = useSWR(id ? `/api/products/${id}` : null);
	if (error) {
		console.error("ERROR!", error.info);
		return (
			<div>
				<p>{error.message}</p>
				<p>Status: {error.status}</p>
			</div>
		);
	}

	if (isLoading || !product)
		return (
			<div>
				<p>loading...</p>
			</div>
		);

	const { name, description, price, currency, category } = product;

	return (
		<>
			<Link href="/">&lt; back to products overview</Link>
			<section>
				<h1>{name}</h1>
				<p>{description}</p>
				<InfoSection>
					<strong aria-label="price">
						{price} {currency}
					</strong>
					<em aria-label="category">{category}</em>
				</InfoSection>
			</section>
		</>
	);
}

const InfoSection = styled.section`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1em;
`;
