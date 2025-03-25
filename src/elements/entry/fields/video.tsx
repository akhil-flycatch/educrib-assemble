import Input from '@elements/entry/input';
import {
	FC
} from 'react';
import {
	FieldProps
} from 'types/field';

const Video: FC<FieldProps> = ({
	register
}) => <Input register={register} label='Video' name='video' type='url' />;

export default Video;
