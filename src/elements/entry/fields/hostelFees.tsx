import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const HostelFees: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Hostel Fees' name='hostelFees' type='number' />;

export default HostelFees;
