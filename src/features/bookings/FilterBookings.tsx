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

const FilterButton = styled.button<{ $active?: boolean }>`
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
  /* make same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;



function FilterBookings() {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleFilter(value: string){
    if(value === "all") {
      searchParams.delete("status");
      setSearchParams(searchParams);
      return
    }

    searchParams.set("status", value);
    searchParams.set("page", String(1));
    setSearchParams(searchParams);

    
  }

 const filterValue = searchParams.get("status") || "all";

  return (
    <StyledFilterDiv>

      <FilterButton 
        $active={filterValue === "all"} 
        disabled={filterValue === "all"} 
        onClick={()=>{handleFilter("all")}}>
          All
      </FilterButton>

      <FilterButton 
        $active={filterValue === "checked-in"} 
        disabled={filterValue === "checked-in"} 
        onClick={()=>{handleFilter("checked-in")}}>
          Checked in
      </FilterButton>

      <FilterButton 
        $active={filterValue === "checked-out"} 
        disabled={filterValue === "checked-out"} 
        onClick={()=>{handleFilter("checked-out")}}>
          Checked out
      </FilterButton>

      <FilterButton 
        $active={filterValue === "unconfirmed"} 
        disabled={filterValue === "unconfirmed"} 
        onClick={()=>{handleFilter("unconfirmed")}}>
          Unconfirmed
      </FilterButton>

    </StyledFilterDiv>
  )
}

export default FilterBookings

