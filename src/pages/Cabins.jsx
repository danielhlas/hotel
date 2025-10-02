import { useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import CabinsFilterSort from "../features/cabins/CabinsFilterSort";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1" style={{marginBottom: "45px"}}>All cabins</Heading>
        <CabinsFilterSort/>
      </Row>

      <Row>
        <CabinTable />
        <div>
          <Button onClick={()=>setShowForm((show)=>!show)}>Add Cabin</Button>
        </div>
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
