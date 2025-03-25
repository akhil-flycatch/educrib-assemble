import Select from '@elements/entry/select';
import {
	FREQUENCY_OPTIONS
} from 'constants/form';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const HostelFeeFrequency: FC<FieldProps> = ({
	register
}) => <Select register={register} label='Hostel Fee Frequency' name='hostelFeeFrequency' options={FREQUENCY_OPTIONS} />;

export default HostelFeeFrequency;