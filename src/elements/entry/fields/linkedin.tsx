import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Linkedin: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Linkedin' name='linkedin' />;

export default Linkedin;