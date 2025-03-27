import Autocomplete from '@elements/entry/autocomplete';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const University: FC<FieldProps> = ({
	register
}) => <Autocomplete index='university' url='/api/master/college/university' label='University' name='university' register={register} />;

export default University;