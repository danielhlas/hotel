import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 0.4rem;

  @media (min-width: 750px) {
    flex-direction: row;
    gap: 1.6rem;
  }
`;

export default TableOperations;
