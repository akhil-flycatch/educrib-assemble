import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Facebook: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Facebook' name='facebook' />;

export default Facebook;
