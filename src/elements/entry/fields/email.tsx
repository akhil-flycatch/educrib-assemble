import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Email: FC<FieldProps> = ({
	register
}) => <Input label='Email Address' name='email' register={register} />;

export default Email;
