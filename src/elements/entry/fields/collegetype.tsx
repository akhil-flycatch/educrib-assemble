import Autocomplete from '@elements/entry/autocomplete';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const CollegeType: FC<FieldProps> = ({
	register
}) => {
	return (
		<Autocomplete register={register} label='Type' name='type' url={''} index={''} />);
};

export default CollegeType;
