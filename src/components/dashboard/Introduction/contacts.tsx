"use client";
import Image from "next/image";
import DashboardIntroSectionWrapper from "./sectionWrapper";
import React, { useEffect, useState } from "react";
import Modal from "@/elements/modal";
import ContactCard from "./contactCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ConatctForm, {
  contactFormSchema,
  ContactFormValues,
} from "./contactForm";
import { getProfileContactsByProfileId } from "@/api";

const Contacts: React.FC = () => {
  const isEmpty = false;
  const [visible, setVisible] = useState<"Add" | string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      phone: "",
      name: "",
      type: "",
      email: "",
    },
  });

  const onContactFormSubmit = async (data: ContactFormValues) => {
    console.log(data);
    reset();
    setVisible(null);
  };

  const [contacts, setContacts] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        const data = await getProfileContactsByProfileId("clrpz6nnn000mlf08dy5aqjdm");
        setContacts(data);
      };
  
      fetchData();
    }, []);
    console.log(contacts,"contacts")

  return (
    <React.Fragment>
      <DashboardIntroSectionWrapper
        title="contacts"
        wrapperClass="w-[355px] h-[517px]"
        primaryButton={{
          type: "Add",
          onClick: () => {
            setVisible("Add");
          },
        }}
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Image
              src="images/contacts.svg"
              alt="contacts"
              width={44}
              height={44}
            />
            <span className="text-[15px] leading-6 text-center text-label">
              No contacts yet. To add a contact, use the add button above.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            <ContactCard
              name="Manoj T Joy"
              email="manojt@gmail.com"
              phone="+91 9343 433 543"
              department="Admission"
              image="/images/mocks/avatar.png"
              onEdit={setVisible}
            />
            <ContactCard
              name="Rakesh M"
              email="rakeshm@gmail.com"
              phone="+91 9343 433 543"
              department="Vice Principal"
              onEdit={setVisible}
            />
          </div>
        )}
      </DashboardIntroSectionWrapper>
      <Modal
        visible={Boolean(visible)}
        onClose={() => setVisible(null)}
        onSave={handleSubmit(onContactFormSubmit)}
        title={`${visible === "Add" ? "Add" : "Edit"} Contact`}
      >
        <form
          className="w-full"
          onSubmit={handleSubmit(onContactFormSubmit)}
        >
          <ConatctForm register={register} errors={errors} setValue={setValue} />
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default Contacts;
