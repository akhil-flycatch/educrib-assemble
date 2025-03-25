import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const GirlsCapacity: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Girls Capacity' name='girlsCapacity' type='number' />;

export default GirlsCapacity;
