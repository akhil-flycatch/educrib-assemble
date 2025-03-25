import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  avatar,
  capacityRequired,
  courseIdRequired,
  durationRequired,
  durationTypeIdRequired,
  id,
  intakeIdRequired,
  levelIdRequired,
  profileId,
  specializationIdRequired,
  status,
  thumbnail,
} from "./base";
import { handleError } from "./handleError";

export const profileProgrammeSchema = z.object({
  id,
  status,
  avatar,
  thumbnail,
  courseId: courseIdRequired,
  specializationId: specializationIdRequired,
  profileId,
  intakeId: intakeIdRequired,
  capacity  : capacityRequired,
  levelId: levelIdRequired,
  duration : durationRequired,
  durationTypeId: durationTypeIdRequired,
});

export const profileProgrammeValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>
) => {
  const formValues = event.target;
  try {
    const {
      id,
      thumbnail,
      status,
      avatar,
      courseId,
      specializationId,
      profileId,
      intakeId,
      capacity,
      levelId,
      duration,
      durationTypeId,
    } = formValues;

    const parsedData = {
      id: id.value,
      thumbnail: thumbnail.value,
      status: status.checked,
      avatar: avatar.value,
      courseId: courseId.value,
      specializationId: specializationId.value,
      profileId: profileId.value,
      intakeId: intakeId.value,
      capacity: capacity.value,
      levelId: levelId.value,
      duration: duration.value,
      durationTypeId: durationTypeId.value,
    };

    profileProgrammeSchema.parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};