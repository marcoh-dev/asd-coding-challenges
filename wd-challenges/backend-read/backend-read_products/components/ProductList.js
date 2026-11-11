import useSWR from "swr";
import StyledLink from "@/components/Link";
import styled from "styled-components";

function getProductRating(product) {
	if (product.reviews.length > 0) {
		const maxScore = 5;
		const reviewScores = product.reviews.map((review) => review.rating);
		const reviewScoreTotal = reviewScores.reduce((acc, curr) => acc + curr, 0);
		const reviewAverage = Math.round((reviewScoreTotal / reviewScores.length) * 10) / 10;
		return `⭐ ${reviewAverage}/${maxScore} (${product.reviews.length})`;
	}
	return null;
}

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
							{product.name} {getProductRating(product)}
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
