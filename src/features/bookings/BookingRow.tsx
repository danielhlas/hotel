import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { format, isToday } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const StatusPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    display: contents;
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
  border: 1.5px solid #e2e1ff;
  padding: 0.5px 8px;
  margin-bottom: 3px;
  font-size: 13px;
  
  @media (min-width: 768px){
    margin-bottom: 0px;
    font-size: 14px;
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 12px;

  @media (min-width: 768px){
    font-size: 14px;
  }

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
    status: "unconfirmed" | "checked-in" | "checked-out";
    guests: { fullName: string; email: string } | null;
    cabins: { name: string } | null;
  }
}

function BookingRow({ booking }: BookingRowProps) {
  if (booking === null) throw new Error("booking se nenačetl")
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
  const cabinName = cabins?.name ?? "-";
  //const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
  //const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

  const navigate = useNavigate();

  const statusToTagName: Record<"unconfirmed" | "checked-in" | "checked-out",
    "blue" | "green" | "silver"> = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const finalSalesNum = String(formatCurrency(totalPrice)).replace(".00", "")

  return (
    <Table.Row>

      <StatusPriceContainer>
        <Cabin>{cabinName}</Cabin>

        <Stacked>
          <span className="px-3 sm:px-0">{guestName}</span>
          <Tooltip>
            <TooltipTrigger className="text-ellipsis overflow-hidden text-nowrap w-[80%] sm:w-[100%] mx-auto">{email}</TooltipTrigger>
            <TooltipContent>
              <p className='text-xl'>{email}</p>
            </TooltipContent>
          </Tooltip>
        </Stacked>
      </StatusPriceContainer>

      <Stacked>
        <span>
          {numNights} nights
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd')} &mdash;{' '}
          <p>{format(new Date(endDate), 'MMM dd yyyy')}</p>
        </span>
      </Stacked>

      <StatusPriceContainer>
        <Tag $type={statusToTagName[status]}>
          {status.replace('-', ' ')}
        </Tag>

        <Amount>{finalSalesNum}</Amount>
      </StatusPriceContainer>

    </Table.Row>
  );
}

export default BookingRow;
