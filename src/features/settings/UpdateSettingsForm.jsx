import { useSettings } from './useSettings';
import { useEditSettings } from './useEditSettings';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function UpdateSettingsForm() {

  //read data from Supabase:
  const {isLoading, dataFromSettings:{
    minBookingLength, 
    maxBookingLength, 
    maxGuestsPerBooking, 
    breakfastPrice
    }={},  } = useSettings();


    //Update data from Supabase
    const {isLoading: isUpdating, editSettings} = useEditSettings();

    //Reusable function to update input values:
    function handleUpdateInput(e, inputName){
 
    if(e.target.value) {
      editSettings({[inputName]: e.target.value})
    }
    }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' disabled={isUpdating} id='min-nights' defaultValue={minBookingLength} onBlur={e=>handleUpdateInput(e, "minBookingLength")}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' disabled={isUpdating} id='max-nights' defaultValue={maxBookingLength}  onBlur={e=>handleUpdateInput(e, "maxBookingLength")}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' disabled={isUpdating} id='max-guests' defaultValue={maxGuestsPerBooking} onBlur={e=>handleUpdateInput(e, "maxGuestsPerBooking")}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number'disabled={isUpdating}  id='breakfast-price' defaultValue={breakfastPrice} onBlur={e=>handleUpdateInput(e, "breakfastPrice")}/>
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm;
