import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Admin: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Admin' name='admin' />;

export default Admin;