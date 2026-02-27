import styled from 'styled-components';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from "./TodayActivity"

const StyledDashboardLayout = styled.div`
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
      <StyledDashboardLayout className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            
        {/* Top 4 tiles */}
        <div className="xl:col-span-2">
          <Stats 
            bookingsAfterDate={bookingsAfterDate} 
            staysAfterDate={staysAfterDate} 
            daysSelectedNumber={daysSelectedNumber}
            />
        </div>


        <TodayActivity/>
        {/* Todays bookings */}  
        <DurationChart staysAfterDate={staysAfterDate} />


      <div className="xl:col-span-2">
        <SalesChart  bookingsAfterDate={bookingsAfterDate} daysSelectedNumber={daysSelectedNumber}/>
      </div>

      </StyledDashboardLayout>
    </>
  );
}


export default DashboardLayout;
