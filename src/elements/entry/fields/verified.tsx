import Select from '@elements/entry/select';
import {
	YES_NO_OPTIONS
} from 'constants/form';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Verified: FC<FieldProps> = ({
	register
}) => <Select register={register} label='Verified' name='verified' options={YES_NO_OPTIONS} />;

export default Verified;
