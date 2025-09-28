import { useSearchParams } from "react-router-dom";
import Select from "../../ui/Select"


function Sort({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedSort = searchParams.get("sort") || ""

    function handleChange(e) {
        searchParams.set("sort", e.target.value);
        setSearchParams(searchParams);
    }


    return (
        <Select options={options} value={selectedSort} type="white" onChange={handleChange}/>
    )
}

export default Sort


