import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const EstablishedYear: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Established Year' name='establishedYear' type='number' minLength={4} maxLength={4} />;

export default EstablishedYear;