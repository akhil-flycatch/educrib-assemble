import {
	FC,
	ReactNode
} from 'react';

interface InfoProps {
	label: string;
	children: ReactNode
}

const Info: FC<InfoProps> = ({
	label, children
}) => {
	return (
		<div className='flex flex-col p-2 space-y-2 rounded-md shadow bg-light'>
			<span className='text-xs text-secondary'>{label}</span>
			<span className='font-bold'>{children}</span>
		</div>
	);
};

export default Info;
