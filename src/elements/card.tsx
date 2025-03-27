import {
	FC,
	ReactNode
} from 'react';

interface CardProps {
	title: string;
	children: ReactNode;
	action?: ReactNode
}

const Card: FC<CardProps> = ({
	title, children, action
}) => {
	return (
		<div className='rounded-md shadow'>
			{title && <div className='px-4 py-2 bg-gradient-to-r from-primary to-secondary text-light rounded-t-md'>{title}</div>}
			<div className='relative flex flex-col p-8 space-y-4 bg-light rounded-b-md'>
				{children}
				{action && <span className='absolute top-0 right-4'>{action}</span>}
			</div>
		</div>
	);
};

export default Card;
