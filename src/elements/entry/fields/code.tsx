import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Code: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Code' name='code' />;

export default Code;

