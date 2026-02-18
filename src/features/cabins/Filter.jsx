import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

const StyledFilterDiv = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleFilter(value){
    searchParams.set("discount", value);
    setSearchParams(searchParams);
  }

 const filterValue = searchParams.get("discount") || "all";

  return (
    <StyledFilterDiv>

      <FilterButton 
        $active={filterValue === "all"} 
        disabled={filterValue === "all"} 
        onClick={()=>{handleFilter("all")}}>
          All
      </FilterButton>

      <FilterButton 
        $active={filterValue === "with-discount"} 
        disabled={filterValue === "with-discount"} 
        onClick={()=>{handleFilter("with-discount")}}>
          With discount
      </FilterButton>

      <FilterButton 
        $active={filterValue === "no-discount"} 
        disabled={filterValue === "no-discount"} 
        onClick={()=>{handleFilter("no-discount")}}>
          No discount
      </FilterButton>

    </StyledFilterDiv>
  )
}

export default Filter

