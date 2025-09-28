import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from "../../ui/Menus"
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import { useQuery } from '@tanstack/react-query';
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from 'react-router-dom';

function BookingTable() {

  // FILTERING
  const [searchParams] = useSearchParams();
  let filterValue = searchParams.get("status");


  //SORTING
  const sortValue = searchParams.get("sort") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const splittedSortValue = {field, direction};
  

  const {isLoading, data: bookings, error} = useQuery({
    queryKey: ["bookings", filterValue, splittedSortValue],
    queryFn: () => getBookings({filterValue, splittedSortValue}),
  })


  if(isLoading) return <Spinner/>

  if (!bookings.length) {
    return <Empty resource="bookings" />
  }


  return (
    <Menus>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>


        {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))} 

          
      
      </Table>
    </Menus>
  );
}

export default BookingTable;
