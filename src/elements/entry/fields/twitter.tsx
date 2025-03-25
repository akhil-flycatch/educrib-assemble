import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Twitter: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Twitter' name='twitter' />;

export default Twitter;
