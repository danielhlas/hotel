import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Div = styled.div`
  max-width: 135rem;
  margin: 0 grid-auto-flow;
  display: flex;
  flex-direction: column;
  gap:3;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
    {/*   
       <Header />
    */} 
      <Sidebar />
      <Main>
        <Div>
          <Outlet />
        </Div>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
