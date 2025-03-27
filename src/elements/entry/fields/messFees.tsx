import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const MessFees: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Mess Fees' name='messFees' type='number' />;

export default MessFees;
