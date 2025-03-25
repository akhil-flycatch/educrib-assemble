import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Created: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Created' name='created' type='date' />;

export default Created;
