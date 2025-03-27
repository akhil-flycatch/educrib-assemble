import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const VirtualTour: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Virtual Tour' name='virtualTour' type='url' />;

export default VirtualTour;
