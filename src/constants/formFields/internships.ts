import { formFiledsFinder } from "./finder";

export const defaultFields = ['title', 'description', 'avatar', 'thumbnail', 'location', 'duration', 'durationTypeId', 'domain', 'remuneration', 'currencyId', 'accomodation', 'benefits', 'website', 'featured', 'recommended', 'verified', 'published', 'views', 'typeId', 'categoryId', 'status'];
export const fieldMapping: { [key: string]: string[] } = {
  schools: ['title', 'description', 'avatar', 'thumbnail', 'location', 'duration', 'durationTypeId', 'domain', 'remuneration', 'currencyId', 'accomodation', 'benefits', 'website', 'featured', 'recommended', 'verified', 'published', 'views', 'typeId', 'categoryId', 'status'],
  institutes: ['title', 'description', 'avatar', 'thumbnail', 'location', 'duration', 'durationTypeId', 'domain', 'remuneration', 'currencyId', 'accomodation', 'benefits', 'website', 'featured', 'recommended', 'verified', 'published', 'views', 'typeId', 'categoryId', 'status'],
};

export const internshipFormFields = () => formFiledsFinder(fieldMapping, defaultFields);
