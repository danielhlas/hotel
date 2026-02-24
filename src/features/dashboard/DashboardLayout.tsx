import styled from 'styled-components';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from "./TodayActivity"

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export type BookingsAfterDateType = {
  created_at: Date;
  extrasPrice: number;
  totalPrice: number
}[];

export type stayAfterDateType = {
  id: number;
  created_at: Date;
  cabinId: number;
  cabinPrice: number;
  startDate: Date;
  endDate: Date;
  guestId: number;
  guests: {fullName: string};
  hasBreakfast: boolean;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  status: string;
  totalPrice: number;
  };

type DashboardLayoutProps = {
  staysAfterDate: stayAfterDateType[];
  daysSelectedNumber: number;
  bookingsAfterDate: BookingsAfterDateType;
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
