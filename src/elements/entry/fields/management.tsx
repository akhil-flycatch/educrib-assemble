import { FieldProps } from '@/types/field';
import Autocomplete from '@elements/entry/autocomplete';
import {
	FC
} from 'react';


const Management: FC<FieldProps> = ({
	register
}) => {

	return (
		<Autocomplete index='management' url='/api/master/college/management' label='Management' name='management' register={register} />);
};

export default Management;
