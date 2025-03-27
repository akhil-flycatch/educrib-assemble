import TextArea from '@elements/entry/textarea';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Description: FC<FieldProps> = ({
	register
}) => <TextArea register={register} label='Description' name='description' />;

export default Description;
