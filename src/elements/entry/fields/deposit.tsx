import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Deposit: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Deposit' name='deposit' type='number' />;

export default Deposit;
