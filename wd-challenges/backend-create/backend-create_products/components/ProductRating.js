import styled from "styled-components";
import Star from "./Star";

export default function ProductRating({ product }) {
	if (product.reviews.length === 0) {
		return;
	}
	console.log(product.reviews);
	const maxScore = 5;
	const reviewScores = product.reviews.map((review) => review.rating);
	const reviewScoreTotal = reviewScores.reduce((acc, curr) => acc + curr, 0);
	const reviewAverage = Math.round((reviewScoreTotal / reviewScores.length) * 10) / 10;
	return (
		<section
			style={{
				display: "flex",
				flexDirection: "row",
				gap: ".5ch",
				alignItems: "center",
			}}
		>
			<RatingWrap>
				{Array.from({ length: maxScore }, (_, i) => (
					<StarWrap key={i}>
						<Star index={i} score={reviewAverage} />
					</StarWrap>
				))}
			</RatingWrap>
			<span style={{ fontSize: "0.8rem" }}>{`(${product.reviews.length})`}</span>
		</section>
	);
}

export const RatingWrap = styled.section`
	display: flex;
	flex-direction: row;
	gap: 0.2em;
	align-items: center;
`;

export const StarWrap = styled.span`
	position: relative;

	svg {
		width: 1rem;
		height: 1rem;
		fill: black;
	}
	svg.filled {
		fill: orange;
	}
`;
