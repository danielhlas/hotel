// @ts-nocheck

import toast from "react-hot-toast";
import styled from "styled-components";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoDuplicateSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { formatCurrency } from "../../utils/helpers";
import { addCabin, deleteCabin } from "../../services/apiCabins";
import EditCabinForm from "./EditCabinForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;


function CabinRow({cabin}) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const queryClient = useQueryClient();
	
  //Mazání řádku/případu ze Supabase tabulky:
	const {isLoading, mutate} = useMutation({
		mutationFn: (id) => deleteCabin(id), 
		onSuccess: () => {
      toast.success("Cabin successfully deleted");
			queryClient.invalidateQueries({
				queryKey: ["cabins"]
			})
		},
		onError: (err) => alert(err.message)
	})

  //Duplikace řádku
  const {mutate: duplicateCabin, isLoading: isDuplicatingCabin} = useMutation({
		mutationFn: cabin => addCabin({
      name: `Copy of ${cabin.name}`, 
      maxCapacity: cabin.maxCapacity, 
      regularPrice: cabin.regularPrice,
      discount: cabin.discount,
      image: cabin.image
     }),

		onSuccess: () => {
			toast.success("New cabin successfully added")
			queryClient.invalidateQueries({queryKey: ["cabins"]});
		},
		onError: (err) => toast.error(err),
	})


  return (
    <>
      <Table.Row>
        <Img src={cabin.image} alt={cabin.name}/>
        <Cabin>{cabin.name}</Cabin>
        <div>For {cabin.maxCapacity} guests</div>

        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        {cabin.discount ? <Discount>{cabin.discount}% off</Discount> : "-"}
      
        <span>      
          {/* Toggle menu with actions buttons */}
          <Menus.Menu>
            <Menus.Toggle id={cabin.id}/>
            <Menus.List id={cabin.id}>
              <Menus.Button icon={<IoDuplicateSharp/>} onClick={()=>duplicateCabin(cabin)}>Duplicate</Menus.Button>
              <Menus.Button icon={<FaEdit/>} onClick={() => setShowEditForm((showForm) => !showForm)}>Edit</Menus.Button>
              <Menus.Button icon={<MdDeleteForever/>} onClick={() => setShowDeleteConfirmation((showDeleteConfirmation) => !showDeleteConfirmation)}>Delete</Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </span>
        
      </Table.Row>
    


      {showEditForm && (
        <Modal setShowForm={setShowEditForm}>
          <EditCabinForm cabinToEdit={cabin} setShowEditForm={setShowEditForm}/>
        </Modal>
      )}


      {showDeleteConfirmation && (
        <Modal setShowForm={setShowDeleteConfirmation}>
          <ConfirmDelete
            resource={cabin.name} // nebo jiný čitelný text
            onConfirm={() => {
              mutate(cabin);
              setShowDeleteConfirmation(false);
            }}
            close={() => setShowDeleteConfirmation(false)} // předáváme funkci
          />
        </Modal>
      )}


    </>
  )
}

export default CabinRow
