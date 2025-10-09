import styled from 'styled-components';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from "../check-in-out/TodayActivity"

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


function DashboardLayout({ staysAfterDate, bookingsAfterDate, daysSelectedNumber }) {

  return (
    <>
      <br />
      <StyledDashboardLayout>
            
        <Stats 
          bookingsAfterDate={bookingsAfterDate} 
          staysAfterDate={staysAfterDate} 
          daysSelectedNumber={daysSelectedNumber}
          />
        <TodayActivity/>
        <DurationChart staysAfterDate={staysAfterDate} />
        <SalesChart bookingsAfterDate={bookingsAfterDate} daysSelectedNumber={daysSelectedNumber}/>
      </StyledDashboardLayout>
    </>
  );
}


export default DashboardLayout;
