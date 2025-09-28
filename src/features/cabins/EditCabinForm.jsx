import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { editCabin } from "../../services/apiCabins";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;


function EditCabinForm({ cabinToEdit = {}, setShowEditForm }) { 
  const { register, handleSubmit, reset, formState } = useForm({defaultValues: cabinToEdit});
  const queryClient = useQueryClient();
  const oldImgUrl = cabinToEdit.image

  const {mutate, isLoading} = useMutation({
		mutationFn: (cabinToEdit) => editCabin(cabinToEdit, oldImgUrl),
		onSuccess: () => {
      reset();	
			queryClient.invalidateQueries({queryKey: ["cabins"]});
		},
		onError: (err) => toast.error(err),
	})
	

  function handleEditCabin(data){
    const imageResult = typeof data.image === "string" ? data.image : data.image[0];
     mutate({...data, image: imageResult, id: data.id});
  }

  function handleErrorFunkce(){
    toast.error("Opravte příslušná pole");
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(handleEditCabin, handleErrorFunkce)}>
      
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" disabled={isLoading} {...register("name", {
          required: "Vyplňte pole",
        })} />
         {formState.errors?.name?.message && formState.errors.name.message }
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" disabled={isLoading} {...register("maxCapacity", {
          required: "Vyplňte pole",
          message: "Hodnota musí být vyšší než 0",
          validate: (value) => value < 9 || "Žádný pokoj nemá kapacitu větší než 8"
        })}/>
        {formState.errors?.maxCapacity?.message && formState.errors.maxCapacity.message }
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" disabled={isLoading} {...register("regularPrice", {
          required: "Vyplňte pole",
          min: { 
            value: 1,
            message: "Hodnota musí být vyšší než 0",
          }
        })} />
        {formState.errors?.regularPrice?.message && formState.errors.regularPrice.message }
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" disabled={isLoading} defaultValue={0} {...register("discount", {
          required: "Vyplňte pole",
          max: { 
            value: 100,
            message: "Sleva nemůže být vyšší než 100 %",
          }

        })} />
        {formState.errors?.discount?.message && formState.errors.discount.message }
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" disabled={isLoading} defaultValue="" {...register("description", {
          required: "Vyplňte pole",
        })}/>
       {formState.errors?.description?.message && formState.errors.description.message }
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Change photo (optinal):</Label>
        <FileInput id="image" accept="image/*" type="file" {...register("image")} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset"  onClick={()=>setShowEditForm?.(false)}>
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default EditCabinForm;
