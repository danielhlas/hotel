import styled from "styled-components";

export const Flag = styled.img`
  max-width: 1.8rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);

  @media (min-width: 600px) {
    max-width: 3rem;
  }
`;
