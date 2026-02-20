import TableOperations from "../../ui/TableOperations";
import Filter from "./Filter";
import Sort from "./Sort";

function CabinsFilterSort(){

    return <TableOperations>    
        <Filter/>
        <Sort options={
        [
            {value: "name-asc", label: "Name A-Z"},
            {value: "name-desc", label: "Name Z-A"},
            {value: "regularPrice-asc", label: "Price low to high"},
            {value: "regularPrice-desc", label: "Price high to low"},
            {value: "maxCapacity-asc", label: "Max capacity low to high"},
            {value: "maxCapacity-desc", label: "Max capacity  high to low"},    
        ]
        }/>
    </TableOperations>
} 

export default CabinsFilterSort;