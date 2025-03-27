import {
	FieldValues, UseFormRegister
} from 'react-hook-form';

export interface FieldProps {
	register: UseFormRegister<FieldValues>
}