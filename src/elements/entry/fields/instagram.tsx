import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Instagram: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Instagram' name='instagram' />;

export default Instagram;
