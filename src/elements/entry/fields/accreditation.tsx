import Select from '@elements/entry/select';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Accreditation: FC<FieldProps> = ({
	register
}) => (
	<Select
		register={register}
		multiple
		label='Accreditation'
		name='accreditation'
		options={[
			{
				label: 'NAAC', value: 'NAAC'
			},
			{
				label: 'A+', value: 'A+'
			},
		]} />
);

export default Accreditation;
