import styled from "styled-components";

type TagProps = {
  $type?: "blue" | "green" | "silver";
};

const Tag = styled.span<TagProps>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 100px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    padding: 0.4rem 1.2rem;
  }

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.$type}-700);
  background-color: var(--color-${(props) => props.$type}-100);
`;

export default Tag;
