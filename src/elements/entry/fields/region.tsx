import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Region: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Region' name='region' />;

export default Region;
