import {
	DetailedHTMLProps,
	FC,
	OptionHTMLAttributes,
	SelectHTMLAttributes
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

export interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
	register: UseFormRegister<FieldValues>;
	direction?: DirectionTypes;
	label: string;
	name: string;
	hideLabel?: boolean;
	loading?: boolean;
	options: Array<{
		value: string;
		label: string
	}>
}

export interface OptionProps extends DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement> {
	value: string;
	label: string;
}

const Option: FC<OptionProps> = ({
	value, label, ...props
}) => (
	<option value={value} label={label} {...props}>{value}</option>
);

const Select: FC<SelectProps> = ({
	register, direction = 'vertical', label, name, hideLabel = false, loading = false, options, ...props
}) => {

	if (loading) return <FieldLoading direction={direction} hideLabel={hideLabel} />;

	return (
		<Group direction={direction}>
			{!hideLabel && <Label htmlFor={name}>{label}</Label>}
			<select id={name} {...register(name)} name={name} {...props} placeholder={`Choose ${label}`} onChange={(e) => console.log(e.target.value)}>
				{options && options.map(item => <Option key={item.value} value={item.value} label={item.label} />)}
			</select>
		</Group>
	);
};

export default Select;
