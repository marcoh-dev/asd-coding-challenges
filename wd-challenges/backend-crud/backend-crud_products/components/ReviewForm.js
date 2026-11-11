import styled from "styled-components";
import StyledButton from "@/components/Button";
import Star from "./Star";

export default function ReviewForm({ onSubmit, productId, heading, ...props }) {
  const { data } = props; //optional props

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledHeading>{heading}</StyledHeading>
      <StyledLabel htmlFor="title">
        Title:
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={data?.title}
        />
      </StyledLabel>
      <StyledLabel htmlFor="text">
        Text:
        <textarea
          id="text"
          name="text"
          required
          defaultValue={data?.text}
        ></textarea>
      </StyledLabel>
      <StyledLabel htmlFor="rating5">Rating:</StyledLabel>

      <section className="rating">
        {[...Array(5)].map((_, i) => {
          const value = 5 - i;

          return (
            <>
              <input
                type="radio"
                id={`star${value}`}
                name="rating"
                value={value}
                defaultChecked={data?.rating === value}
                required
              />

              <label htmlFor={`star${value}`}>
                <Star />
              </label>
            </>
          );
        })}
      </section>
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

export const StyledRatingRadioWrap = styled.div`
  input {
    display: none;
  }
  svg {
    width: 1rem;
    height: 1rem;
    fill: black;
  }
`;

export const StyledRatingStarLabel = styled.label`
  cursor: pointer;

  &:hover {
    svg {
      fill: orange;
    }
  }

  input:checked ~ svg {
    fill: orange;
  }

  input {
    display: none;
  }
  svg {
    width: 1rem;
    height: 1rem;
    fill: black;
  }
`;
