import {
	FC
} from 'react';

import Quote from './quote';

interface BoxProps {
	quote?: string
}

const Box: FC<BoxProps> = ({
	quote
}) => {
	return (
		<div className='p-10 rounded-sm shadow bg-light'>
			{quote && <Quote>{quote}</Quote>}
		</div>
	);
};

export default Box;
