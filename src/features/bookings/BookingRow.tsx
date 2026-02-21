import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { format, isToday } from 'date-fns';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;


type BookingRowProps = {
  booking: {
    id: number;
    created_at: any;
    startDate: any;
    endDate: any;
    numNights: number;
    numGuests: number;
    totalPrice: number;
    status: string;
    guests: { fullName: string; email: string } | null;
    cabins: { name: string } | null;
  }
}

function BookingRow({ booking } : BookingRowProps) {
  if (booking === null)  throw new Error("booking se nenačetl")
  const {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests,
    cabins,
  } = booking;
  const guestName = guests?.fullName ?? "Unknown guest";
  const email = guests?.email ?? "No email";
  const cabinName = cabins?.name ?? "Unknown cabin";
  //const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
//const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

       <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag $type={statusToTagName[status]}>
        {status.replace('-', ' ')}
      </Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

    </Table.Row>
  );
}

export default BookingRow;
