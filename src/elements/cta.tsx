import {
	createElement,
	FC,
	ReactNode
} from 'react';
import {
	Icon
} from 'react-feather';

interface CtaProps {
	text: string;
	action: ReactNode;
	icon?: Icon
}

const Cta: FC<CtaProps> = ({
	text, action, icon
}) => {
	return (
		<div className='flex items-center justify-between px-8 py-4 rounded-md shadow bg-gradient-to-l from-primary to-secondary'>
			<div className='flex items-center space-x-4 text-white'>
				{icon && createElement(icon)}
				<span className='text-xl font-bold'>{text}</span>
			</div>
			{action}
		</div>
	);
};

export default Cta;
