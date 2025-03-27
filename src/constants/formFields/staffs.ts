import { formFiledsFinder } from "./finder";

export const defaultFields = ['title', 'avatar', 'designationId', 'staffContacts', 'status']
export const fieldMapping: { [key: string]: string[] } = {
  schools: ['title', 'avatar', 'designationId', 'staffContacts', 'status'],
  institutes: ['title', 'avatar', 'designationId', 'staffContacts', 'status']
};

export const staffFormFields = () => formFiledsFinder(fieldMapping, defaultFields);
