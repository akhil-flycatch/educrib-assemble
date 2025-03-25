import {
	FC
} from 'react';


import Group from './group';
import Label from './label';
import { DirectionTypes } from '@/types/common';
import { Loader } from 'lucide-react';

interface LoadingProps {
	direction?: DirectionTypes;
	hideLabel?: boolean
}

const Loading: FC<LoadingProps> = ({
	direction = 'vertical', hideLabel = false
}) => {
	return (
		<Group direction={direction}>
			{!hideLabel && <Label>Loading</Label>}
			<Loader className='animate-spin' />
		</Group>
	);
};

export default Loading;
