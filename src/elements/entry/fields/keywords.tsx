import TextArea from '@elements/entry/textarea';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Keywords: FC<FieldProps> = ({
	register
}) => <TextArea register={register} label='Keywords' name='keywords' />;

export default Keywords;
