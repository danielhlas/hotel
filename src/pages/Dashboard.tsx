import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import FilterDashboard from "../features/dashboard/FilterDashboard";
import { subDays } from "date-fns";
import { getBookingsAfterDate, getStaysAfterDate } from "../services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { uploadBookings } from "../data/Uploader";
import { useEffect } from "react";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()

  const daysSelected = searchParams.get("last");
  const daysSelectedNumber = daysSelected ? parseInt(daysSelected) : 7;
  const queryDate = subDays(new Date(), daysSelectedNumber).toISOString();


  const queryClient = useQueryClient();


  const { isLoading: isLoadingStayes, data: staysAfterDate, error: errorStayes } = useQuery({
    queryKey: ["StaysAfterDate", daysSelectedNumber],
    queryFn: () => getStaysAfterDate(queryDate)
  })

  //if not enough data, upload new bookings to database and refetch:
  useEffect(function () {
    if (isLoadingStayes || !staysAfterDate) return;
    if (staysAfterDate?.length < 2) {
      uploadBookings().then(() => {
        queryClient.invalidateQueries({ queryKey: ["StaysAfterDate", daysSelectedNumber], refetchType: 'active' })
        queryClient.invalidateQueries({ queryKey: ["BookingsAfterDate", daysSelectedNumber], refetchType: 'active' })
      })
    }
  }, [isLoadingStayes, staysAfterDate, daysSelectedNumber])


  const { isLoading: isLoadingBookings, data: bookingsAfterDate, error: errorBookings } = useQuery({
    queryKey: ["BookingsAfterDate", daysSelectedNumber],
    queryFn: () => getBookingsAfterDate(queryDate)
  })




  if (isLoadingStayes || isLoadingBookings) return <Spinner />
  {console.log("test" + staysAfterDate)}

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <FilterDashboard />
      </Row>

      <DashboardLayout staysAfterDate={staysAfterDate} bookingsAfterDate={bookingsAfterDate} daysSelectedNumber={daysSelectedNumber} />
    </>

  );
}

export default Dashboard;
