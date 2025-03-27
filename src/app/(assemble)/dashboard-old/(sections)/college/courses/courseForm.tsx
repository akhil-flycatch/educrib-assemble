"use client";

import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";

import { upsertAction, upsertProfileProgram } from "@/api/index";
import { programmesFormFields } from "@/constants/formFields";
import { Form } from "@/storybooks/components/atoms";
import { Loading } from "@/storybooks/components/molecules";
import {
  Avatar,
  Capacity,
  Course,
  Duration,
  DurationType,
  Id,
  Intake,
  Level,
  ProfileId,
  ProgrammeFees,
  Specialization,
  Status,
  Submit,
  Thumbnail,
} from "@/storybooks/forms/fields";
import { profileProgrammeValidation } from "@/storybooks/forms/validations";
// import { ProfileProgrammeJoin, TError } from "@/types";

const ProgrammeForm = ({
  programme,
  profile,
  setOpen,
}: {
  programme?: any;
  profile: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    id,
    thumbnail,
    avatar,
    courseId,
    course,
    specializationId,
    specialization,
    profileId,
    intakeId,
    intake,
    capacity,
    levelId,
    level,
    duration,
    durationTypeId,
    durationType,
    status = true,
    profileProgrammeFees,
  } = { ...programme };
  const [error, setError] = useState<any | undefined>(undefined);
  const [fields, setFields] = useState<string[]>([]);

  useEffect(() => {
    const getFields = async () => {
      const formFields = await programmesFormFields();
      setFields(formFields);
    };
    getFields();
  }, []);

  const handleSubmit = async (event: any) => {
    profileProgrammeValidation(event, setError);
  };
  console.log("the valie", fields);
  const postAction = async () => {
    // const program = await getProfilePrograms();
    if (setOpen) {
      setOpen(false);
    }
    // const program = await getProfilePrograms();
  };

  const formAction = (formData: FormData) => {
    const programmeFees: any[] = [];
    const formDataEntries = Array.from(formData.entries());

    for (let i = 0; i < formDataEntries.length; i++) {
      const [key, value] = formDataEntries[i];
      const regex =
        /^programmeFees\[(\d+)\]\.(title|amount|currencyId|frequencyId)$/;
      const match = key.match(regex);

      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];

        if (!programmeFees[index]) {
          programmeFees[index] = {};
        }

        programmeFees[index][field] = value;
        formData.delete(key);
      }
    }
    formData.set("profileProgrammeFees", JSON.stringify(programmeFees));
    upsertAction(
      formData,
      // updateProfileCourse,
      upsertProfileProgram,
      "Programme saved successfully",
      postAction
    );
  };

  const fieldMapping: { [k: string]: React.ReactNode } = {
    thumbnail: (
      <Thumbnail
        defaultValue={thumbnail ?? undefined}
        error={error?.thumbnail}
      />
    ),
    avatar: <Avatar defaultValue={avatar ?? undefined} error={error?.avatar} />,
    course: (
      <Course
        defaultValue={
          courseId && course
            ? { value: courseId, label: course.title }
            : undefined
        }
        error={error?.courseId}
      />
    ),
    specialization: (
      <Specialization
        defaultValue={
          specializationId && specialization
            ? { value: specializationId, label: specialization.title }
            : undefined
        }
        error={error?.specializationId}
      />
    ),
    intake: (
      <Intake
        defaultValue={
          intakeId && intake
            ? { value: intakeId, label: intake.title }
            : undefined
        }
        error={error?.intakeId}
      />
    ),
    level: (
      <Level
        defaultValue={
          levelId && level ? { value: levelId, label: level.title } : undefined
        }
        error={error?.levelId}
      />
    ),
    durationType: (
      <DurationType
        defaultValue={
          durationTypeId && durationType
            ? { value: durationTypeId, label: durationType.title }
            : undefined
        }
        error={error?.durationTypeId}
      />
    ),
    duration: (
      <Duration
        defaultValue={String(duration) ?? undefined}
        error={error?.duration}
      />
    ),
    capacity: (
      <Capacity
        defaultValue={String(capacity) ?? undefined}
        error={error?.capacity}
      />
    ),
    programmeFees: (
      <ProgrammeFees
        defaultValue={profileProgrammeFees ?? undefined}
        error={error?.profileProgrammeFees}
      />
    ),
    status: <Status defaultValue={status} />,
  };

  const formFields = fields.map((field: string, i: number) => (
    <Fragment key={i}>{fieldMapping[field]}</Fragment>
  ));
  console.log("the form fields", formFields);
  return (
    <>
      {formFields.length > 0 ? (
        <Form action={formAction} onSubmit={handleSubmit}>
          <Id defaultValue={id} />
          <ProfileId defaultValue={profileId ?? profile ?? undefined} />
          {formFields}
          <Submit />
        </Form>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProgrammeForm;
