import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Slug: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Slug' name='slug' />;

export default Slug;
