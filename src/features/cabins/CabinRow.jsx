import styled from "styled-components";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoDuplicateSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { formatCurrency } from "../../utils/helpers";
import { addCabin, deleteCabin } from "../../services/apiCabins";
import EditCabinForm from "./EditCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
      <TableRow role="row">
        <Img src={cabin.image} alt={cabin.name}/>
        <Cabin>{cabin.name}</Cabin>
        <div>For {cabin.maxCapacity} guests</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        {cabin.discount ? <Discount>{cabin.discount}% off</Discount> : "-"}
        
        <span>
          <button onClick={() => duplicateCabin(cabin)}><IoDuplicateSharp /></button>
          <button onClick={() => setShowEditForm((showForm) => !showForm)}><FaEdit /></button>
          <button onClick={() => mutate(cabin)}><MdDeleteForever /></button>
        </span>
      </TableRow>
    
      {showEditForm &&  <EditCabinForm cabinToEdit={cabin} /> }
     
    </>
  )
}

export default CabinRow
