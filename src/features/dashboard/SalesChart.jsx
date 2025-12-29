import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';
import Heading from '../../ui/Heading';
import DashboardBox from './DashboardBox';
import { subDays, eachDayOfInterval, format, isSameDay } from 'date-fns';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 0.8rem;
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
  /* Hack to change grid line colors */

`;

function SalesChart({bookingsAfterDate = [], daysSelectedNumber = 7}) {


  const listOfSelectedDates = eachDayOfInterval({
    start: subDays(new Date(), daysSelectedNumber - 1),
    end: new Date(),
  })

  const data = listOfSelectedDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookingsAfterDate
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookingsAfterDate
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
});


  const colors = {
  totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
  extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
  text: "#374151",
  background: "#fff",
};

  return (
    <StyledSalesChart>

      <Heading as="h2">Sales:  {format(listOfSelectedDates.at(0), "MMM dd yyyy")} - {format(listOfSelectedDates.at(-1), "MMM dd yyyy")}</Heading>

      <ResponsiveContainer height={300} width="100%">
          <AreaChart data={data} >
            <XAxis dataKey="label" />
            <YAxis unit="$"/>
            <CartesianGrid />
            <Tooltip />
            <Area dataKey="totalSales" type="monotone" stroke={colors.totalSales.stroke} fill={colors.totalSales.fill} name="Total sales" unit="$" />
            <Area dataKey="extrasSales" type="monotone" stroke={colors.extrasSales.stroke} fill={colors.extrasSales.fill} name="Extra sales" unit="$" />

          </AreaChart>
      </ResponsiveContainer> 

    </StyledSalesChart>
  );
}

export default SalesChart;