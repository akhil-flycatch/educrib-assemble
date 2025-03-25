import {
	FC, ReactNode
} from 'react';
import {
	DirectionTypes
} from 'types/common';

interface GroupProps {
	children: ReactNode;
	direction?: DirectionTypes;
	className?: string | undefined;
}

const Group: FC<GroupProps> = ({
	children,
	direction = 'vertical',
	className
}) => {
	return (
		<div className={`flex ${direction === 'vertical' ? 'flex-col space-y-1' : 'flex-row space-x-2'} ${className}`}>
			{children}
		</div>
	);
};

export default Group;
