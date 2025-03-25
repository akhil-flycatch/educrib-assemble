import { formFiledsFinder } from "./finder";

export const defaultFields = ['title', 'description', 'avatar', 'thumbnail', 'location', 'startDate', 'endDate', 'eventTickets', 'website', 'typeId', 'categoryId', 'featured', 'recommended', 'verified', 'published', 'views', 'status'];
export const fieldMapping: { [key: string]: string[] } = {
  schools: ['title', 'description', 'avatar', 'thumbnail', 'location', 'startDate', 'endDate', 'eventTickets', 'website', 'typeId', 'categoryId', 'featured', 'recommended', 'verified', 'published', 'views', 'status'],
  institutes: ['title', 'description', 'avatar', 'thumbnail', 'location', 'startDate', 'endDate', 'eventTickets', 'website', 'typeId', 'categoryId', 'featured', 'recommended', 'verified', 'published', 'views', 'status'],
};

export const eventsFormFields = () => formFiledsFinder(fieldMapping, defaultFields);

