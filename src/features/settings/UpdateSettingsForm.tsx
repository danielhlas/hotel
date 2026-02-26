import { useSettings } from './useSettings';
import { useEditSettings } from './useEditSettings';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import type { updateSettingProps } from '../../services/apiSettings';
import styled, { css } from "styled-components";

export const SettingsFormRow = styled.div`
display: flex;
flex-direction: column;
align-items: start;
justify-content: space-between;
gap: 1rem; /* gap-4 */
padding: 2rem 0rem;
border-bottom: 1px solid #efefef;

@media (min-width: 640px) {
  flex-direction: row;
  align-items: center;
}
`;

function UpdateSettingsForm() {
  //read data from Supabase:
  const {isLoading, dataFromSettings:{
    minBookingLength, 
    maxBookingLength, 
    maxGuestsPerBooking, 
    breakfastPrice
    }={},  
  } = useSettings();


    //Update data from Supabase
    const { isEditing: isUpdating, editSettings } = useEditSettings();


    //Reusable function to update input values:
    function handleUpdateInput(e: React.FocusEvent<HTMLInputElement>, inputName: keyof updateSettingProps) {
      if (!e.target) return
      if(e.target.value) {
        editSettings({[inputName]: Number(e.target.value)})
      }
    }

  return (
    <Form>
      <SettingsFormRow>
        <label htmlFor="min-nights">Minimum nights/booking</label>
        <Input type='number' disabled={isUpdating} id='min-nights' defaultValue={minBookingLength} onBlur={e=>handleUpdateInput(e, "minBookingLength")}/>
      </SettingsFormRow>

      <SettingsFormRow>
        <label htmlFor="max-nights">Maximum nights/booking</label>
        <Input type='number' disabled={isUpdating} id='max-nights' defaultValue={maxBookingLength}  onBlur={e=>handleUpdateInput(e, "maxBookingLength")}/>
      </SettingsFormRow>

      <SettingsFormRow>
        <label htmlFor="max-guests">Maximum guests/booking</label>
        <Input type='number' disabled={isUpdating} id='max-guests' defaultValue={maxGuestsPerBooking} onBlur={e=>handleUpdateInput(e, "maxGuestsPerBooking")}/>
      </SettingsFormRow>

      <SettingsFormRow>
        <label htmlFor="breakfast-price">Breakfast price</label>
        <Input type='number'disabled={isUpdating}  id='breakfast-price' defaultValue={breakfastPrice} onBlur={e=>handleUpdateInput(e, "breakfastPrice")}/>
      </SettingsFormRow>
      
    </Form>
  )
}

export default UpdateSettingsForm;
