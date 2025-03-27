import {
	FC
} from 'react';

interface QuoteProps {
	children: string
}

const Quote: FC<QuoteProps> = ({
	children
}) => {
	return (
		<div className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary'>{children}</div>
	);
};

export default Quote;
