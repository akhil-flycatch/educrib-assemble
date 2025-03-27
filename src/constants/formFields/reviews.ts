import { formFiledsFinder } from "./finder";

export const defaultFields = ['title', 'description', 'email', 'location', 'rating','name', 'phone', 'status'];
export const fieldMapping: { [key: string]: string[] } = {
  schools: ['title', 'description', 'email', 'location', 'rating','name', 'phone', 'status'],
  institutes: ['title', 'description', 'email', 'location', 'rating','name', 'phone', 'status']
};

export const reviewsFormFields = () => formFiledsFinder(fieldMapping, defaultFields);
