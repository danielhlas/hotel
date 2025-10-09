import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import FilterDashboard from "../features/dashboard/FilterDashboard";
import { subDays } from "date-fns";
import { getBookingsAfterDate, getStaysAfterDate } from "../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Spinner from "../ui/Spinner";

function Dashboard() {

  const [searchParams, setSearchParams] = useSearchParams()

  const daysSelected = searchParams.get("last");
  const daysSelectedNumber = daysSelected ? parseInt(daysSelected) : 7;
  const queryDate = subDays(new Date(), daysSelectedNumber).toISOString();


  const {isLoadingStayes, data: staysAfterDate, errorStayes} = useQuery({
    queryKey: ["StaysAfterDate", daysSelectedNumber],
    queryFn: () => getStaysAfterDate(queryDate)
  })

  const {isLoadingBookings, data: bookingsAfterDate, errorBookings} = useQuery({
    queryKey: ["BookingsAfterDate", daysSelectedNumber],
    queryFn: () => getBookingsAfterDate(queryDate)
  })
  
  if (isLoadingStayes || isLoadingBookings) return <Spinner/>


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <FilterDashboard />
      </Row>

      <DashboardLayout staysAfterDate={staysAfterDate} bookingsAfterDate={bookingsAfterDate} daysSelectedNumber={daysSelectedNumber}/>
    </>

  );
}

export default Dashboard;
