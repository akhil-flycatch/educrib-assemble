import { deleteProfileContact } from "@/api";
import Button from "@elements/button";
import Modal from "@elements/modal";
import Text from "@elements/text";
import ContactForm from "@entry/forms/contact";
import { Edit, Mail, PhoneCall, Trash } from "lucide-react";
import { useState } from "react";
export default function ContactItem({ contact }: any) {
  const [visible, setVisible] = useState(false);
  console.log(contact, "contact inside list");
  return (
    <div className="relative flex flex-col justify-between rounded-md shadow bg-light group">
      <div className="flex flex-col p-4 space-y-2">
        <span className="text-xs text-primary">Admission</span>
        <span className="font-bold">{contact?.title}</span>
      </div>
      <div className="flex flex-col p-4 space-y-2 bg-secondary/10 rounded-b-md">
        <Text direction="horizontal" className="text-xs" icon={PhoneCall}>
          {contact?.phone}
        </Text>
        <Text direction="horizontal" className="text-xs" icon={Mail}>
          {contact?.email}
        </Text>
      </div>
      <div className="absolute inset-0 invisible rounded-md bg-dark/70 group-hover:visible" />
      <div className="absolute inset-0 flex items-center justify-center invisible space-x-2 rounded-md group-hover:visible">
        <Modal
          visible={visible}
          onClose={() => setVisible(false)}
          title="Edit Contact"
        >
          <ContactForm contact={contact} />
        </Modal>
        <Button icon={Edit} onClick={() => setVisible(true)} />
        <Button
          icon={Trash}
          onClick={() => deleteProfileContact(contact?.id)}
        />
      </div>
    </div>
  );
}
