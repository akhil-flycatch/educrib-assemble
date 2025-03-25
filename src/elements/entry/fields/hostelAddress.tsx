import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const HostelAddress: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Hostel Address' name='hostelAddress' />;

export default HostelAddress;
