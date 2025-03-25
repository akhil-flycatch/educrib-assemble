import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Phone: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Phone' name='phone' />;

export default Phone;
