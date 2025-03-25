import { formFiledsFinder } from "./finder";

export const defaultFields = [
  "title",
  "alias",
  "thumbnail",
  "avatar",
  "description",
  "code",
  "establishedYear",
  "managementId",
  "universityId",
  "typeId",
  "curriculumId",
  "published",
  "status",
];
export const fieldMapping: { [key: string]: string[] } = {
  schools: [
    "title",
    "alias",
    "thumbnail",
    "avatar",
    "description",
    "code",
    "establishedYear",
    "managementId",
    "typeId",
    "curriculumId",
    "published",
    "status",
  ],
  institutes: [
    "title",
    "alias",
    "thumbnail",
    "avatar",
    "description",
    "code",
    "establishedYear",
    "universityId",
    "managementId",
    "typeId",
    "curriculumId",
    "published",
    "status",
  ],
};

export const profileFormFields = () =>
  formFiledsFinder(fieldMapping, defaultFields);
