import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from "../../ui/Menus"
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from 'react-router-dom';
import { ROWS_PER_PAGE } from "../../utils/constants"

function BookingTable() {

  // FILTERING
  const [searchParams] = useSearchParams();
  let filterValue = searchParams.get("status");


  //SORTING
  const sortValue = searchParams.get("sort") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const splittedSortValue = {field, direction};

  
  //PAGINATION
  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  
//QUERY
  const {isLoading, data: {data: bookings, count} = {}, error} = useQuery({
    queryKey: ["bookings", filterValue, splittedSortValue, currentPage],
    queryFn: () => getBookings({filterValue, splittedSortValue, currentPage}),
  })



//PRE-FETCHING
const queryClient = useQueryClient();
const numOfPages = Math.ceil(count/10);

if(currentPage < numOfPages){
  queryClient.prefetchQuery({
    queryKey: ["bookings", filterValue, splittedSortValue, currentPage+1],
    queryFn: () => getBookings({filterValue, splittedSortValue, currentPage: currentPage+1}),
  })
}


if(currentPage > 1){
  queryClient.prefetchQuery({
    queryKey: ["bookings", filterValue, splittedSortValue, currentPage-1],
    queryFn: () => getBookings({filterValue, splittedSortValue, currentPage: currentPage-1}),
  })
}





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

          
          <Table.Footer>
            <Pagination numberOfRows={count} numOfPages={numOfPages} />
          </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
