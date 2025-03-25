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

const Promoted: FC<FieldProps> = ({
	register
}) => <Select register={register} label='Promoted' name='promoted' options={YES_NO_OPTIONS} />;

export default Promoted;
