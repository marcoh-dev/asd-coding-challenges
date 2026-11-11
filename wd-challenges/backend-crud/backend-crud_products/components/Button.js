import styled from "styled-components";

export default styled.button`
  appearance: none;
  display: table;
  color: inherit;
  border: none;
  background: var(--color-water-10);
  font-size: larger;
  padding: 0.5rem 1rem;
  box-shadow: 0px 1px 5px -2px var(--color-granite);

  &:hover {
    cursor: pointer;
  }
`;

export const MiniButton = styled.button`
  appearance: none;
  display: table;
  color: inherit;
  border: none;
  background: var(--color-water-10);
  font-size: 0.5rem;
  padding: 0.2rem 0.5rem;
  box-shadow: 0px 1px 5px -2px var(--color-granite);

  &:hover {
    cursor: pointer;
  }
`;
