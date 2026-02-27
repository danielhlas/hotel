import styled from 'styled-components';

const DashboardBox = styled.div`

  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (min-width: 500px){
    padding: 3.2rem;
  }
`;

export default DashboardBox;
