import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import MobileMenu from "./MobileMenu";


const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;


const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 0.6rem 6.4rem;
  overflow: scroll;
  overflow: -moz-hidden-none;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 450px) {
    padding: 4rem 1.3rem 6.4rem;

  }

  @media (min-width: 768px) {
    padding: 4rem 4.8rem 6.4rem;
  }
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
    //Layout: Left navbar vs context
    <StyledAppLayout className="grid-cols-[4.5rem_1fr]  sm:grid-cols-[6rem_1fr] lg:grid-cols-[26rem_1fr]">
      {/* <Header /> */}

      <div className="lg:hidden">
        <MobileMenu />
      </div>
      <div className="hidden lg:inline-block">
        <Sidebar />
      </div>

      <Main>
        <Div>
          <Outlet />
        </Div>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
