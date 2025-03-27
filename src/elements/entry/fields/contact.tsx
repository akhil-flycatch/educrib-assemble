import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Contact: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Contact Person' name='title' />;

export default Contact;
