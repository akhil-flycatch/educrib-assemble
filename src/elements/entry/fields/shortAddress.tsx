import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const ShortAddress: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Short Address' name='shortAddress' />;

export default ShortAddress;
