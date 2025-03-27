import { upsertProfileContact } from "@/api/profileContact";
import { Form } from "@/storybooks/components/atoms";
import {
  ContactName,
  ContactType,
  Email,
  Phone,
  Submit,
} from "@/storybooks/forms/fields";
import { Dispatch, SetStateAction } from "react";
// import { Contact } from "lucide-react";

const ContactForm = ({
  profileId,
  setVisible,
  contact,
}: {
  profileId?: any;
  setVisible?: Dispatch<SetStateAction<any>>;
  contact?: any;
}) => {
  //   const { register, handleSubmit } = useForm();
  console.log("the contct", contact);
  const handleSubmit = async (data: any) => {
    console.log("on submit", data);
  };

  const formAction = async (formData: FormData) => {
    console.log("the form actios", formData.get("contactTypeId"));

    // Add profileId to formData for update logic
    formData.append("profileId", contact.profileId);
    formData.append("id", contact.id);

    try {
      const result = await upsertProfileContact(formData);
      // setVisible(false);
    } catch (error) {
      console.error("Failed to upsert profile", error);
    }
  };

  return (
    <Form action={formAction} onSubmit={handleSubmit}>
      <ContactType
        defaultValue={
          contact ? { value: contact.contactTypeId, label: "Fax" } : undefined
        }
      />
      <ContactName defaultValue={contact?.title} />
      <Phone defaultValue={contact?.phone} />
      <Email defaultValue={contact?.email} />
      <Submit />
    </Form>
  );
};

export default ContactForm;
