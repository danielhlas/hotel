import styled from 'styled-components';
import Row from "../../ui/Row"
import Heading from "../../ui/Heading"
import TodayItem from "./TodayItem"
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';
import { uploadBookings } from '../../data/Uploader';
import { useEffect } from 'react';

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 0.8rem;  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;



function TodayActivity() {
  const queryClient = useQueryClient();

  //QUERY
  const { isLoading, data, error } = useQuery({
    queryKey: ["TodayActivity"],
    queryFn: () => getStaysTodayActivity(),
  })

  //if not enough data:
  useEffect(function () {
    if (!isLoading && data?.length < 2) {
      uploadBookings().then(() => {
        queryClient.invalidateQueries({ queryKey: ["TodayActivity"], refetchType: 'active' })
      })
      console.log("data less than 2, uploadBookings() done")
    }
  }, [data, isLoading])


  if (isLoading) return


  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {
        (data.length > 0)
          ?
          <TodayList>
            {data.map(current => <TodayItem current={current} key={current.id} />)}
          </TodayList>
          :
          <NoActivity>No activity today</NoActivity>
      }

    </StyledToday>
  )
}

export default TodayActivity
