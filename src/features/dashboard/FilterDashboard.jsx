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
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function FilterDashboard() {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleFilter(value){
    searchParams.set("last", value);
    setSearchParams(searchParams);
  }

 const filterValue = searchParams.get("last") || "7days";

  return (
    <StyledFilterDiv>

      <FilterButton 
        $active={filterValue === "7days"} 
        disabled={filterValue === "7days"} 
        onClick={()=>{handleFilter("7days")}}>
          Last 7 days
      </FilterButton>

      <FilterButton 
        $active={filterValue === "30days"} 
        disabled={filterValue === "30days"} 
        onClick={()=>{handleFilter("30days")}}>
          Last 30 days
      </FilterButton>

      <FilterButton 
        $active={filterValue === "90days"} 
        disabled={filterValue === "90days"} 
        onClick={()=>{handleFilter("90days")}}>
          Last 90 days
      </FilterButton>

    </StyledFilterDiv>
  )
}

export default FilterDashboard

