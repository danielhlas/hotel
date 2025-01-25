import { useEffect, useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1" style={{marginBottom: "45px"}}>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={()=>setShowForm((show)=>!show)}>Add Cabins </Button>
      </Row>

      {showForm && (
      <Modal setShowForm={setShowForm}>
        <CreateCabinForm showForm={showForm} setShowForm={setShowForm}/>
      </Modal>
      )}
    </>
  );
}

export default Cabins;
