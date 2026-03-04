import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useWindowSize } from "../../hooks/useWindowSize";
import { IMG_HIDE_VALUE } from "../../utils/constants";


function CabinTable() {
  const { isLoading, data: cabins, error } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins
  })

  const width = useWindowSize();
  //4cols for smallest screen. img is hidden
  let tableColumns = "0.6fr 1.5fr 2fr 1px";

  if (width >= 640) {
    //6cols for medium/big screen
    tableColumns = "0.8fr 1fr 2fr 1fr 2fr 1px"
  }
  else if (width >= 480) {
    //5cols for small screen
    tableColumns = "1fr 0.6fr 1.5fr 1.3fr 1px";    //
  }


  //Filtering by discount
  const [searchParams, setSearchParams] = useSearchParams()
  const filterValue = searchParams.get("discount") || "all";


  if (isLoading) return <Spinner />

  if (!cabins?.length) {
    return <Empty resource="cabins" />
  }


  //1. Filtering
  let filteredCabins;
  if (filterValue === "all") {
    filteredCabins = cabins;
  }
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter(cabin => cabin.discount > 0);
  }


  //2. Sorting (after filtering, so we sort only the filtered items)
  const sortValue = searchParams.get("sort") || "name-asc";

  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  type CabinType = {
    id: number;
    image: "string";
    maxCapacity: number;
    name: string;
    regularPrice: number;
    discount: number;
    description: string;
    created_at: Date;
  }

  //Special case for string (name)
  function compare(a: CabinType, b: CabinType) {
    if (a["name"] < b["name"]) {
      return -1 * modifier;
    }
    if (a["name"] > b["name"]) {
      return 1 * modifier;
    }
    return 0;
  }

  const sortedCabins =
    field === "name"
      ? filteredCabins?.sort(compare)
      : filteredCabins?.sort((a, b) => (a[field] - b[field]) * modifier);


  return (
    <div>
      <Menus>
        <Table columns={tableColumns}>
          <Table.Header>
            <div className="hidden xxs:block"></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div className="hidden sm:block">Price</div>
            <div className="hidden sm:block">Discount</div>
            <div className="sm:hidden ">Price & Discount</div>
            <div></div> {/* empty space for the menu toggle button */}
          </Table.Header>
          <Table.Body>
            {sortedCabins?.map(cabin => (
              <CabinRow key={cabin.id} cabin={cabin} />
            ))}
          </Table.Body>
        </Table>
      </Menus>
    </div>
  )
}

export default CabinTable
