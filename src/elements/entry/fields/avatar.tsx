import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Avatar: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Avatar' name='avatar' type='file' />;

export default Avatar;