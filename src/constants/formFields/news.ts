import { formFiledsFinder } from "./finder";

export const defaultFields = ['title', 'description', 'avatar', 'thumbnail', 'website', 'featured', 'recommended', 'verified', 'published', 'views', 'status'];
export const fieldMapping: { [key: string]: string[] } = {
  schools: ['title', 'description', 'avatar', 'thumbnail', 'website', 'featured', 'recommended', 'verified', 'published', 'views', 'status'],
  institutes: ['title', 'description', 'avatar', 'thumbnail', 'website', 'featured', 'recommended', 'verified', 'published', 'views', 'status'],
};

export const newsFormFields = () => formFiledsFinder(fieldMapping, defaultFields);
