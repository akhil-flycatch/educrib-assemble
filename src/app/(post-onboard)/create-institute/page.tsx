"use client";
import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { upsertAction, upsertProfileOfUser } from "@/api";
import { profileValidation } from "@/storybooks/forms/validations";
import OnboardForm from "@/components/onboard-form";

export default function CreateProfileForm() {
  const [error, setError] = useState<any>(undefined);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    profileValidation(event, setError, true);
  };
  const formAction = (formData: FormData) => {
    formData.set("status", "on");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    upsertAction(
      formData,
      upsertProfileOfUser,
      "Profile saved successfully",
      () => {
        router.push("/");
      }
    );
  };
  return (
    <Fragment>
      <OnboardForm />

      
      {/* <Form action={formAction} onSubmit={handleSubmit}>
        

        {/* <Id defaultValue={undefined} />
      <Verticals
        defaultValue={verticalId ? { label: vertical || "", value: verticalId } : undefined}
        error={error?.verticalId}
      /> */}

        {/* <Title error={error?.title} />
        <Description error={error?.description} />
        <Types defaultValue={undefined} error={error?.typeId} />
        <EstablishedYear error={error?.establishedYear} />
        <Management defaultValue={undefined} error={error?.managementId} />
        <Recommended defaultValue={false} />
        <Featured defaultValue={false} />
        <Published defaultValue={false} />
        <Submit /> 
      </Form> */}
    </Fragment>
  );
}
