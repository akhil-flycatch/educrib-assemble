"use client";


import {
	FC,
	useCallback,
	useEffect,
	useState
} from 'react';
import {
	FieldValues, UseFormRegister
} from 'react-hook-form';
import Select from 'react-select';
import {
	DirectionTypes
} from 'types/common';

import Group from './group';
import Label from './label';
import FieldLoading from './loading';

const customStyles = {
	control: (provided: any) => ({
		...provided,
		padding: 2
	})
};

interface AutocompleteProps {
	url: string;
	index: string;
	register?: UseFormRegister<FieldValues>;
	direction?: DirectionTypes;
	label: string;
	name: string;
	hideLabel?: boolean;
	loading?: boolean;
}

const Autocomplete: FC<AutocompleteProps> = ({
	url, hideLabel, name, loading, label, direction = 'vertical'
}) => {
	const [
		options, setOptions
	] = useState<{ label: string; value: number }[]>([
	]);
	const [
		keyword, setKeyword
	] = useState('');

	const fetchData = useCallback(() => {
		return fetch(`${url}/${keyword}`)
			.then(response => response.json())
			.then(data => {
				if (data) {
					const newOptions: { label: string; value: number }[] = [
					];
					// data?.map((item: { [x: string]: any; id: any; }) => newOptions.push({
					// 	label: item[index], value: item.id
					// }));
					newOptions.push({
						label: 'Please Chosse', value: 1
					});
					setOptions(newOptions);
				}
			});
	}, [
		keyword, url
	]);

	useEffect(() => {
		fetchData();
	}, [
		fetchData
	]);

	function handleInputChange(value: string) {
		setKeyword(value);
	}

	if (loading) return <FieldLoading direction={direction} hideLabel={hideLabel} />;

	return (
		<Group direction={direction}>
			{!hideLabel && <Label htmlFor={name}>{label}</Label>}
			<Select
				onInputChange={handleInputChange}
				options={options}
				placeholder={`Choose ${label}`}
				styles={customStyles}
				className='autocomplete'
			/>
		</Group>
	);
};

export default Autocomplete;