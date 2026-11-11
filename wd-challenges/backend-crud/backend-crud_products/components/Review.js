import { useState } from "react";
import { MiniButton } from "./Button";
import ReviewForm from "./ReviewForm";

export default function Reviews({ onSubmit, onDelete, review, productId }) {
	const [isEditReviewMode, setIsEditReviewMode] = useState(false);
	/*
  useEffect(() => {
    setIsEditReviewMode(false);
  }, [onEditingSuccess]);
*/

	async function handleSubmit(event) {
		const submit = await onSubmit(event);

		if (submit?.ok) {
			setIsEditReviewMode(false);
		}
	}

	return (
		<li key={review._id}>
			<p>
				{review.rating}/5: <strong>{review.title}</strong> <br />
				{review.text}
			</p>
			<section
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "1rem",
					padding: "0 0 1rem 0",
				}}
			>
				<MiniButton
					type="button"
					onClick={() => {
						setIsEditReviewMode(!isEditReviewMode);
					}}
				>
					✏️
				</MiniButton>
				<MiniButton type="button" onClick={() => onDelete(review._id)}>
					❌
				</MiniButton>
			</section>
			{isEditReviewMode && (
				<ReviewForm
					onSubmit={handleSubmit}
					data={review}
					productId={productId}
					heading="Edit this review"
					isEditReviewMode={isEditReviewMode}
				/>
			)}
		</li>
	);
}
