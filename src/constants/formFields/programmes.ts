import { formFiledsFinder } from "./finder";

export const defaultFields = ['thumbnail', 'avatar', 'course', 'specialization', 'intake', 'level', 'durationType', 'duration', 'capacity', 'programmeFees', 'status'];
export const fieldMapping: { [key: string]: string[] } = {
  schools: ['thumbnail', 'avatar', 'course', 'specialization', 'intake', 'level', 'durationType', 'duration', 'capacity', 'programmeFees', 'status'],
  institutes: ['thumbnail', 'avatar', 'course', 'specialization', 'intake', 'level', 'durationType', 'duration', 'capacity', 'programmeFees', 'status'],
};

export const programmesFormFields = () => formFiledsFinder(fieldMapping, defaultFields);
