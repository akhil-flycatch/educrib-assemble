import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const HostelContact: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Hostel Contact' name='hostelContact' />;

export default HostelContact;
