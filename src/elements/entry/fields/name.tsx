import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Name: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Name' name='name' />;

export default Name;