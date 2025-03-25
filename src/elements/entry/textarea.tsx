import {
	DetailedHTMLProps,
	FC,
	TextareaHTMLAttributes
} from 'react';
import {
	FieldValues, UseFormRegister
} from 'react-hook-form';
import {
	DirectionTypes
} from 'types/common';

import Group from './group';
import Label from './label';
import FieldLoading from './loading';

export interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	register: UseFormRegister<FieldValues>;
	direction?: DirectionTypes;
	label: string;
	name: string;
	hideLabel?: boolean;
	loading?: boolean;
}

export const TextArea: FC<TextAreaProps> = ({
	// register,
	direction = 'vertical', label, name, hideLabel = false, loading = false, ...props
}) => {

	if (loading) return <FieldLoading direction={direction} hideLabel={hideLabel} />;

	return (
		<Group direction={direction}>
			{!hideLabel && <Label htmlFor={name}>{label}</Label>}
			<textarea id={name} name={name} {...props} placeholder={`Enter ${label}`} />
		</Group>
	);
};

export default TextArea;
