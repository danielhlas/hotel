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

type DashboardLayoutProps = {
staysAfterDate: {
 id: number;
 created_at: Date;
 cabinId: number;
 cabinPrice: number;
 endDate: Date;
 guestId: number;
 guests: {fullName: string};
 hasBreakfast: boolean;
 isPaid: boolean;
 numGuests: number;
 numNights: number;
 observations: string;
 startDate: Date;
 status: string;
 totalPrice: number;
}[];
daysSelectedNumber: number;
bookingsAfterDate: {
  created_at: Date;
  extrasPrice: number;
  totalPrice: number
}[];
}

function DashboardLayout({ staysAfterDate, bookingsAfterDate, daysSelectedNumber }: DashboardLayoutProps) {

  return (
    <>
      <br />
      <StyledDashboardLayout>
            
        {/* Top 4 tiles */}
        <Stats 
          bookingsAfterDate={bookingsAfterDate} 
          staysAfterDate={staysAfterDate} 
          daysSelectedNumber={daysSelectedNumber}
          />

        {/* Todays bookings */}  
        <TodayActivity/>
        
        <DurationChart staysAfterDate={staysAfterDate} />
        <SalesChart bookingsAfterDate={bookingsAfterDate} daysSelectedNumber={daysSelectedNumber}/>
      </StyledDashboardLayout>
    </>
  );
}


export default DashboardLayout;
