import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Title: FC<FieldProps> = ({
	register
}) => {
	return <Input label='Title' name='title' register={register} />;
};

export default Title;
