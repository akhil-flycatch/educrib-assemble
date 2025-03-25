import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import {
  alias,
  avatar,
  code,
  curriculumId,
  description,
  establishedYearRequired,
  id,
  managementIdRequired,
  published,
  status,
  thumbnail,
  title,
  typeIdRequired,
  universityId,
  verticalId
} from "./base";
import { handleError } from "./handleError";

export const profileSchema = (create = false) =>
  create
    ? z.object({
        title,
        verticalId
      })
    : z.object({
        id,
        title,
        thumbnail,
        alias,
        avatar,
        description,
        code,
        establishedYear : establishedYearRequired,
        managementId : managementIdRequired,
        universityId,
        typeId : typeIdRequired,
        curriculumId,
        published,
        status
      });

export const profileValidation = async (
  event: any,
  setError: Dispatch<SetStateAction<{ [x: string]: string } | undefined>>,
  create = false
) => {
  const formValues = event.target;
  try {
    const {
      id,
      title,
      thumbnail,
      alias,
      avatar,
      description,
      code,
      establishedYear,
      verticalId,
      managementId,
      universityId,
      typeId,
      curriculumId,
      published,
      status
    } = formValues;

    const parsedData = create
      ? {
          title: title.value,
          verticalId: verticalId.value
        }
      : {
          id: id.value,
          title: title.value,
          thumbnail: thumbnail.value,
          alias: alias.value,
          avatar: avatar.value,
          description: description.value,
          code: code.value,
          establishedYear: establishedYear.value,
          managementId: managementId.value,
          universityId: universityId.value,
          typeId: typeId.value,
          curriculumId: curriculumId.value,
          published: published.value === "on",
          status: status.value === "on"
        };
    profileSchema(create).parse(parsedData);
  } catch (error) {
    handleError(error, setError, event);
  }
};
