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

const Recommended: FC<FieldProps> = ({
	register
}) => <Select register={register} label='Recommended' name='recommended' options={YES_NO_OPTIONS} />;

export default Recommended;