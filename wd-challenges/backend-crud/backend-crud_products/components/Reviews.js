import Review from "./Review";

export default function Comments({ onMutate, reviews, productId }) {
	async function handleReviewEdit(event, reviewId) {
		event.preventDefault();

		const reviewData = Object.fromEntries(new FormData(event.target));

		const response = await fetch(`/api/products/${productId}/reviews/${reviewId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reviewData),
		});

		if (response.ok) {
			onMutate();
			return response;
		} else {
			return console.error(response.status, response.statusText);
		}
	}

	async function handleReviewDelete(reviewId) {
		const response = await fetch(`/api/products/${productId}/reviews/${reviewId}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			return console.error(response.status);
		}

		onMutate();
	}

	return (
		<>
			<h3>Reviews</h3>
			<ul>
				{reviews.map((review) => (
					<Review
						key={review._id}
						onSubmit={(event) => handleReviewEdit(event, review._id)}
						onDelete={() => handleReviewDelete(review._id)}
						review={review}
						productId={productId}
					/>
				))}
			</ul>
		</>
	);
}
