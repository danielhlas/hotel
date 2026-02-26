import { useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import CabinsFilterSort from "../features/cabins/CabinsFilterSort";
import HeaderOfPage from "@/ui/HeaderOfPage";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <HeaderOfPage breakpoint="lg:flex-row">
        <Heading as="h1">Cabins</Heading>
        <CabinsFilterSort/>
      </HeaderOfPage>

      <Row>
        <CabinTable />
        <div>
          <Button data-outside-ignore onClick={()=>setShowForm((show)=>!show)}>Add Cabin</Button>
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
