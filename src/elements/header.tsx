import Image from 'next/image';
import {
	FC
} from 'react';


import Logo from './logo';
import { Bell } from 'lucide-react';

const Header: FC = () => {
	return (
		<div className='w-full px-6 h-[72px] bg-light flex items-center justify-between'>
			<div className='flex items-center space-x-4'>
				<Image src='https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250' alt='User 1' height={40} width={40} objectFit='cover' objectPosition='top' className='rounded-full' />
				<span>John Doe</span>
				<div className='flex items-center'>
					<Bell />
					<div className='px-1 -mt-3 -ml-3 text-xs text-white border-2 rounded-full border-light bg-accent2'>5</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
