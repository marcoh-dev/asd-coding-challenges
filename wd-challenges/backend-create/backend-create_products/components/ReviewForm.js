import styled from "styled-components";
import StyledButton from "@/components/Button";
import useSWR from "swr";

export default function ReviewForm({ id }) {
	const { mutate } = useSWR(`/api/products/${id}`);
	async function handleSubmit(event) {
		event.preventDefault();

		const reviewData = Object.fromEntries(new FormData(event.target));
		const response = await fetch(`/api/products/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reviewData),
		});

		if (response.ok) {
			mutate();
			event.target.reset();
		}
	}

	return (
		<StyledForm onSubmit={handleSubmit}>
			<StyledHeading>Write a review</StyledHeading>
			<StyledLabel htmlFor="title">
				Title:
				<input type="text" id="title" name="title" required />
			</StyledLabel>
			<StyledLabel htmlFor="text">
				Text:
				<textarea id="text" name="text" required></textarea>
			</StyledLabel>
			<StyledLabel htmlFor="rating">
				Rating:
				<select id="rating" name="rating" required>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</StyledLabel>
			<StyledButton type="submit">Submit</StyledButton>
		</StyledForm>
	);
}

export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const StyledHeading = styled.h2`
	text-align: center;
	color: var(--color-nemo);
`;

export const StyledLabel = styled.label`
	display: flex;
	justify-content: space-between;
	gap: 5px;
`;
