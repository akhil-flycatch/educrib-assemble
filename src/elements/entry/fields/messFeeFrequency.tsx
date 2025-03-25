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

const MessFeesFrequency: FC<FieldProps> = ({
	register
}) => <Select register={register} label='Mess Fees Frequency' name='messFeesFrequency' options={FREQUENCY_OPTIONS} />;

export default MessFeesFrequency;