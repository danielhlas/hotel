import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { ROWS_PER_PAGE } from "../utils/constants";

// Get all bookings
export async function getBookings({filterValue, splittedSortValue, currentPage}) {

let promenna123 = supabase
    .from('bookings')
    .select('*, cabins(name), guests(fullName, email)', { count: 'exact' });

// Apply filter if user selected one
if (filterValue) {
    promenna123 = promenna123.eq('status', filterValue);
  }


// Change sorting based on user selection
if (splittedSortValue) {
  promenna123 = promenna123.order(splittedSortValue.field, {ascending: splittedSortValue.direction === "asc"});
}


// Download only selected rows:
if (currentPage) {
	const fromNumber = (currentPage-1) * ROWS_PER_PAGE ;
	const toNumber = (fromNumber-1) + ROWS_PER_PAGE ;

	promenna123 = promenna123.range(fromNumber, toNumber)
}

//Download data from Supabase
const { data, error, count } = await promenna123;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

//Get a single booking by ID
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}



// RETURN BOOKINGS created after given date (usefull for dashboard (last 30 days etc))
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ includeToday: true }));
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}



// RETURN STAYS created after given date
// Stays = bookings with status "unconfirmed" or "checked-in"
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    // While function getBookingsAfterDate() uses created_at, this function uses startDate
    // starDate = when guests actually arrive/check in
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const confirmedStays = data.filter((stay) => stay.status === "checked-in" || stay.status === "checked-out");

  return confirmedStays;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}



export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
