import { formFiledsFinder } from "./finder";

const defaultFields = ['title', 'email', 'phone', 'website', 'contactTypeId', 'status'];
const fieldMapping: { [key: string]: string[] } = {
  schools: ['title', 'email', 'phone', 'website', 'contactTypeId', 'status'],
  institutes: ['title', 'email', 'phone', 'website', 'contactTypeId', 'status']
};

export const contactFormFields = () => formFiledsFinder(fieldMapping, defaultFields)