import Button from 'ui/Button';
import Modal from 'ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  return (
	<Modal>
		<Button>Add new cabin</Button>
		<CreateCabinForm />
	</Modal>
)}

export default AddCabin;
