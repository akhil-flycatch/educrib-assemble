import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const EBrochure: FC<FieldProps> = ({
	register
}) => <Input register={register} label='E-Brochure' name='eBrochure' />;

export default EBrochure;

