import useSWR from "swr";
import StyledLink from "@/components/Link";
import styled from "styled-components";
import ProductRating from "./ProductRating";

export default function ProductList() {
	const { data, isLoading } = useSWR("/api/products");

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	if (!data) {
		return;
	}

	return (
		<>
			<StyledHeading>Available Fishes</StyledHeading>
			<StyledList>
				{data.map((product) => (
					<li key={product._id}>
						<StyledLink href={`/${product._id}`}>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									gap: "1ch",
									alignItems: "center",
								}}
							>
								{product.name} <ProductRating product={product} />
							</div>
						</StyledLink>
					</li>
				))}
			</StyledList>
		</>
	);
}

const StyledHeading = styled.h2`
	text-align: center;
	color: var(--color-nemo);
`;

const StyledList = styled.ul`
	list-style-type: none;
	display: grid;
	gap: 1rem;
	justify-items: center;
	padding: 0;
`;
