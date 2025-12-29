import styled from "styled-components";
import Tag from "../../ui/Tag"
import {Flag} from "../../ui/Flag"

const StyledTodayItem = styled.li`
  display: grid;
  //s tlačítky:
  //grid-template-columns: 9rem 2rem 1fr 7rem 9rem;

  //bez tlačítek
  grid-template-columns: 14rem 2rem 1fr 7rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;


function TodayItem({ current }) {
  //console.log(current)
  return (
    <div>
      <StyledTodayItem>
        {current.status === "unconfirmed" && <Tag type="green">Will arrive</Tag>}
        {current.status === "checked-in" && <Tag type="blue">Will depart</Tag>}
        <Flag src={current.guests.countryFlag} />
        <Guest>{current.guests.fullName}</Guest>
        <div>{current.numNights} nights</div>
      </StyledTodayItem>
    </div>
  )
}

export default TodayItem
