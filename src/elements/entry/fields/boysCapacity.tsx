import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const BoysCapacity: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Boys Capacity' name='boysCapacity' type='number' />;

export default BoysCapacity;
