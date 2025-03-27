import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Rating: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Rating' name='rating' type='number' />;

export default Rating;
