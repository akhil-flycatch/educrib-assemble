import Link from 'next/link';
import {
	AnchorHTMLAttributes,
	DetailedHTMLProps,
	FC
} from 'react';
import {
	ArrowUpRight
} from 'react-feather';

interface HyperlinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
	children: string;
	client?: boolean;
}

const Hyperlink: FC<HyperlinkProps> = ({
	children,
	client = false,
	href
}) => {

	if (client && href) {
		<Link href={href}>
			<a className='flex items-center space-x-1 cursor-pointer text-secondary hover:underline group'>
				<ArrowUpRight className='duration-300 transform group-hover:translate-x-1' />
				<span>{children}</span>
			</a>
		</Link>;
	}

	return (
		<a className='flex items-center space-x-1 cursor-pointer text-secondary hover:underline group' href={href}>
			<ArrowUpRight className='duration-300 transform group-hover:translate-x-1' />
			<span>{children}</span>
		</a>
	);
};

export default Hyperlink;
