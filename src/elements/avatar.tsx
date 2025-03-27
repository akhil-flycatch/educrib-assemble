import React, {
	FC
} from 'react';
import {
	Icon
} from 'react-feather';

interface AvatarProps {
	icon: Icon
}

const Avatar: FC<AvatarProps> = ({
	icon
}) => {
	return (
		<span className='p-2 rounded-md text-dark bg-accent1'>
			{icon && React.createElement(icon)}
		</span>
	);
};

export default Avatar;
