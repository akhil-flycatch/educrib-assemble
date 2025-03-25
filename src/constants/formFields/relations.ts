import { formFiledsFinder } from "./finder";

export const defaultFields = ['name', 'description', 'email', 'location', 'rating', 'phone', 'status'];
export const fieldMapping: { [key: string]: string[] } = {
  schools: ['name', 'description', 'email', 'location', 'rating', 'phone', 'status'],
  institutes: ['name', 'description', 'email', 'location', 'rating', 'phone', 'status'],
};

export const relationsFormFields = () => formFiledsFinder(fieldMapping, defaultFields);
