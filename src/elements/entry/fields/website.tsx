import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Website: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Website' name='website' type='url' />;

export default Website;