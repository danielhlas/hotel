import HeaderOfPage from "@/ui/HeaderOfPage";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return <>
    <HeaderOfPage>
      <Heading as="h1">Settings</Heading>
    </HeaderOfPage>
    
    <UpdateSettingsForm />
  </>
}

export default Settings;
