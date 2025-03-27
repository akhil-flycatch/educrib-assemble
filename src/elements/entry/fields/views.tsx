import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Views: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Views' name='views' type='number' />;

export default Views;
