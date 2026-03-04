import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  text-align: center;
`;

const CommonRow = styled.header<{ $columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
 /*passed props.columns, example: "0.6fr 1.8fr 2.2fr 1fr 1fr 1fr" */
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
  min-width: 0;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 3rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-grey-600);
  line-height: 1.25;
  justify-content: center;

  @media (min-width: 640px){
    font-size: 14px;
    line-height: 1.5;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 3rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;


const TableContext = createContext<{ columns: string }>({ columns: "" });

type TableProps = {
  columns: string;
  children: ReactNode;
}
//TABLE COMPOUND COMPONENT
function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">
        {children}
      </StyledTable>
    </TableContext.Provider>
  );
}


function Header({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader $columns={columns} as={"header"} role="row">
      {children}
    </StyledHeader>
  )
}

function Row({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow $columns={columns} role="row">
      {children}
    </StyledRow>
  )
}

function Body({ children }: { children: ReactNode }) {
  return (
    <StyledBody>
      {children}
    </StyledBody>
  )
}


Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer; //styled component, because it doesn't need any logic

export default Table;