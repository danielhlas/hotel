import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import HeaderOfPage from "@/ui/HeaderOfPage";


function Bookings() {
  return (
    <>
      <HeaderOfPage breakpoint="lg:flex-row">
        <Heading as="h1">Bookings</Heading>
        <BookingTableOperations />
      </HeaderOfPage>

      <BookingTable />
    </>
  );
}

export default Bookings;
