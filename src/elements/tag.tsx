import {
	FC,
	ReactNode
} from 'react';

interface TagProps {
	children: ReactNode
}

const Tag: FC<TagProps> = ({
	children
}) => {
	return (
		<span className='px-2 py-1 text-xs rounded-md bg-gradient-to-r from-primary to-secondary text-light max-w-max'>{children}</span>
	);
};

export default Tag;
