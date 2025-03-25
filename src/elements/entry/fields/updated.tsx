import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Updated: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Updated' name='updated' type='date' />;

export default Updated;