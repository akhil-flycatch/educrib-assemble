// TODO: Handles no facilities condition
"use client";
import Button from "@elements/button";
import Cta from "@elements/cta";
import Modal from "@elements/modal";
import ContactForm from "@entry/forms/contact";
import { PhoneCall, Plus } from "lucide-react";
import { useState } from "react";

import { DialogForm } from "@/storybooks/components/molecules";
import ContactList from "./list";

export default function Contacts({
  contacts,
  id,
}: {
  contacts: any;
  id: number;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col space-y-4">
      <DialogForm
        trigger={
          <Cta
            text={`${contacts?.length > 0 ? contacts?.length : 0} Contacts`}
            action={
              <Button icon={Plus} onClick={() => setVisible(true)}>
                Add Contact
              </Button>
            }
            icon={PhoneCall}
          />
        }
        form={
          <>
            <Modal
              visible={visible}
              onClose={() => setVisible(false)}
              title="Add Contact"
            >
              <ContactForm profileId={id} />
              {/* <CourseForm programme={profileProgramme} /> */}
            </Modal>
          </>
        }
        title="Add New Course"
      />
      {/* <Cta
        text={`${contacts?.length > 0 ? contacts?.length : 0} Contacts`}
        action={
          <Button icon={Plus} onClick={() => setVisible(true)}>
            Add Contact
          </Button>
        }
        icon={PhoneCall}
      /> */}
      <ContactList contacts={contacts} />
      <Modal
        footerVisible={false}
        visible={visible}
        onClose={() => setVisible(false)}
        title="Add Contact"
      >
        <ContactForm profileId={id} />
      </Modal>
    </div>
  );
}
