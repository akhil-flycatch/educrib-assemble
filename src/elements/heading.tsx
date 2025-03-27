import {
	DetailedHTMLProps,
	FC,
	HTMLAttributes
} from 'react';

interface HeadingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	children: string
}

const Heading: FC<HeadingProps> = ({
	level = 1,
	children,
	className
}) => {

	function getClassName() {
		if (level === 1) return 'text-6xl';
		if (level === 2) return 'text-5xl';
		if (level === 3) return 'text-4xl';
		if (level === 4) return 'text-3xl';
		if (level === 5) return 'text-2xl';
		return 'text-xl';
	}

	return (
		<div className={`${getClassName()} font-bold mb-2 ${className}`}>{children}</div>
	);
};

export default Heading;
