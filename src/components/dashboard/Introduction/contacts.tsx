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
import {
  getProfile,
  getProfileContactsByProfileId,
  upsertProfileContact,
} from "@/api";
import { addProfileContact, editProfileContact } from "@/api/profileContact";

const defaultValues: ContactFormValues = {
  avatar: "",
  name: "",
  type: "",
  phone: "",
  email: "",
  id: null,
};

const Contacts: React.FC = () => {
  const isEmpty = false;
  const [visible, setVisible] = useState<"Add" | "Edit" | string | null>(null);
  const [contacts, setContacts] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>();

  const {
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,

    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues
  });

  const handleEdit = (data: any) => {
    setVisible("Edit");
    setImageUrl(data.avatar);
    reset({
      id: data.id,
      name: data.title,
      email: data.email,
      phone: data.phone,
      type: data.contactTypeId,
      avatar: data.avatar || null,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const profile = await getProfile();
      setProfile(profile);
      const data = await getProfileContactsByProfileId(profile?.id!);
      setContacts(data);
    };

    fetchData();
  }, []);

  const onContactFormSubmit = async (data: ContactFormValues) => {
    const formData = new FormData();
    formData.append("title", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("type", data.type);
    formData.append("profileId", profile?.id);
    formData.append("avatar", imageUrl);
    if (data.id) {
      formData.append("id", data.id);
      await editProfileContact(formData);
    } else await addProfileContact(formData);
    setVisible(null);
    setImageUrl(null);
    // Refresh contacts after submission
    reset(defaultValues);
    const updatedContacts = await getProfileContactsByProfileId(profile?.id);
    setContacts(updatedContacts);
  };

  const setImageUrlChange = (url: string) => setImageUrl(url);

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
            {contacts?.map((contact, index) => (
              <ContactCard
                key={index}
                name={contact.title}
                email={contact.email}
                phone={contact.phone}
                department={contact.contactType.title}
                id={contact.id}
                image={contact.avatar}
                data={contact}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </DashboardIntroSectionWrapper>
      <Modal
        visible={Boolean(visible)}
        onClose={() => {
          setVisible(null);
          setImageUrl(null);
          reset(defaultValues)
        }}
        onSave={handleSubmit(onContactFormSubmit)}
        title={`${visible === "Add" ? "Add" : "Edit"} Contact`}
      >
        <form className="w-full" onSubmit={handleSubmit(onContactFormSubmit)}>
          <ConatctForm
            errors={errors}
            setValue={setValue}
            control={control}
            getValues={getValues}
            setImageUrlChange={setImageUrlChange}
          />
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default Contacts;
