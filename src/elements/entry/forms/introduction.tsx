"use client";

import { Form } from "@/storybooks/components/atoms";
// import Form from '@elements/entry/form';
// import Accreditation from '@entry/fields/accreditation';
// import Code from '@entry/fields/code';
// import Type from '@entry/fields/collegetype';
// import EstablishedYear from '@entry/fields/establishedYear';
// import Management from '@entry/fields/management';
// import University from '@entry/fields/university';
// import { useForm } from "react-hook-form";
// import Title from '../fields/title';
import { upsertProfile } from "@/api/profile";
import {
  Accreditations,
  Code,
  EstablishedYear,
  Management,
  Submit,
  Title,
  Types,
  University,
} from "@/storybooks/forms/fields";

interface IntroductionFormProps {
  profileId: string;
}

const IntroductionForm = ({ profileId, profile }: IntroductionFormProps) => {
  console.log("the profie", profile);
  //   const { register, handleSubmit } = useForm();
  var accredition: any = [];
  profile.profileAccreditations?.map((accred: any) =>
    accredition.push({
      value: accred.accreditation.id,
      label: accred.accreditation.title,
    })
  );

  const handleSubmit = async (data: any) => {
    console.log("on submit", data.target.value);
  };

  const formAction = async (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    // Add profileId to formData for update logic
    formData.append("id", profile.id);
    // formData.append("title",)
    console.log("the title", formData.get("universityId"));

    try {
      const result = await upsertProfile(formData);
      // console.log(">>>>", result);
    } catch (error) {
      console.error("Failed to upsert profile", error);
    }
  };

  return (
    <Form action={formAction} onSubmit={handleSubmit}>
      <Title defaultValue={profile.title ? profile.title : undefined} />
      <University
        defaultValue={
          profile.university
            ? { value: profile.university.id, label: profile.university.title }
            : undefined
        }
      />
      <Management
        defaultValue={
          profile.management
            ? { value: profile.management.id, label: profile.management.title }
            : undefined
        }
      />
      <EstablishedYear
        defaultValue={
          profile.establishedYear ? profile.establishedYear : undefined
        }
      />
      <Code defaultValue={profile.code ? profile.code : undefined} />
      <Accreditations
        defaultValue={profile.profileAccreditations ? accredition : undefined}
      />
      <Types
        defaultValue={
          profile.management
            ? { value: profile.type.id, label: profile.type.title }
            : undefined
        }
      />
      <Submit />
    </Form>
  );
};

export default IntroductionForm;
