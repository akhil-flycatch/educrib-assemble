
import Heading from './heading';
import Hyperlink from './hyperlink';
import Logo from './logo';
import Meta from './meta';
import Image from 'next/image';
import {
	FC
} from 'react';
import {
	AuthLayoutProps
} from 'types/layout';

const AuthLayout: FC<AuthLayoutProps> = ({
	title,
	children,
	footerLink = '/help',
	footerLinkTitle = 'Need Help?',
	showFooterLink = true
}) => {
	return (
		<div className='grid w-screen h-screen grid-cols-2'>
			<Meta title={title} />
			<div className='relative'>
				<div className='absolute inset-0'>
					<Image src='/mock/office.jpg' layout='fill' objectFit='cover' objectPosition='center' alt='Educrib Assemble' />
				</div>
				<div className='absolute inset-0 bg-dark/70' />
				<div className='absolute inset-0 flex flex-col justify-center p-8 space-y-4'>
					<Heading level={2} className='text-white'>An End-to-End Unified Platform for Educators</Heading>
					<div className='text-xl text-white/50'>Seamless. Robust. Cloud Native</div>
				</div>
			</div>
			<div className='flex flex-col items-center justify-center space-y-12'>
				<Logo />
				<div className='flex flex-col p-12 space-y-4 rounded-md shadow bg-light min-w-[500px] max-w-[90%]'>
					{children}
				</div>
				{showFooterLink && <Hyperlink client href={footerLink || '#'}>{footerLinkTitle}</Hyperlink>}
			</div>
		</div>
	);
};

export default AuthLayout;
