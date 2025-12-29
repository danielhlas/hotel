import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { getCabins } from '../../services/apiCabins';
import { useQuery } from '@tanstack/react-query';


const StyledStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 0.8rem;

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;
  /* color: var(--color-grey-600); */
`;


function Stats({ bookingsAfterDate, staysAfterDate, daysSelectedNumber }) {

    const {isLoading, data: cabins, error} = useQuery({
      queryKey: ["cabins"],
      queryFn: () => getCabins()
    })

  if (isLoading) return <div>Loading...</div>;

  const numOfBookings = bookingsAfterDate ? bookingsAfterDate.length : 0;
  const sumTotalPrices = bookingsAfterDate?.reduce((acc, curr) => acc + curr.totalPrice, 0)
  const confirmedCheckIns = staysAfterDate?.length;

  const occupancyRate = (numOfBookings / (cabins.length * daysSelectedNumber)) * 100;

  return (
    <>

    <StyledStat>
      <Icon color="blue"><HiOutlineBriefcase/></Icon>
      <Title>Bookings</Title>
      <Value>{numOfBookings}</Value>
    </StyledStat>

    <StyledStat>
      <Icon color="green"><HiOutlineBanknotes/></Icon>
      <Title>Sales</Title>
      <Value>{formatCurrency(sumTotalPrices)}</Value>
    </StyledStat>

    <StyledStat>
      <Icon color="indigo"><HiOutlineCalendarDays/></Icon>
      <Title>Check ins</Title>
      <Value>{confirmedCheckIns}</Value>
    </StyledStat>

    <StyledStat>
      <Icon color="yellow"><HiOutlineChartBar/></Icon>
      <Title>Occupancy rate</Title>
      <Value>{Math.round(occupancyRate)}%</Value>
    </StyledStat>

   </>
  );
}

export default Stats;
