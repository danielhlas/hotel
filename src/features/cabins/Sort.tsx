import { useSearchParams } from "react-router-dom";
import Select from "../../ui/Select"

type SortProps = {
    options:  {
        value: string;
        label: string;
   }[]
}

function Sort({ options }: SortProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedSort = searchParams.get("sort") || ""

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        searchParams.set("sort", e.target.value);
        setSearchParams(searchParams);
    }


    return (
        <Select options={options} value={selectedSort} type="white" onChange={handleChange}/>
    )
}

export default Sort


