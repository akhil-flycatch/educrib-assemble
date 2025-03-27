import Select from '@elements/entry/select';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Status: FC<FieldProps> = ({
	register
}) => {
	return (
		<Select register={register} label='Status' name='status' options={[
			{
				label: 'Active', value: 'Active'
			},
			{
				label: 'Inactive', value: 'Inactive'
			}
		]} />
	);
};

export default Status;
