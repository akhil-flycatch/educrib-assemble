import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const StaffCount: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Staff Count' name='staffCount' type='number' />;

export default StaffCount;
