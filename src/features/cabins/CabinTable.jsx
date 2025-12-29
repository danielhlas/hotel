import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";


function CabinTable() {
  const {isLoading, data: cabins, error} = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins
  })


  //Filtering by discount
  const [searchParams, setSearchParams] = useSearchParams()
  const filterValue = searchParams.get("discount") || "all";


  if(isLoading) return <Spinner/>
  
  if(!cabins.length) {
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

  //Special case for string (name)
  function compare(a, b) {
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
      ? filteredCabins.sort(compare)
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);


  return (
    <div>
      <Menus>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
          </Table.Header>
          <Table.Body>
            {sortedCabins?.map(cabin => (
              <CabinRow key={cabin.id} cabin={cabin}/>
            ))}
          </Table.Body>
        </Table>
      </Menus>

    </div>
  )
}

export default CabinTable
