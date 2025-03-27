import Image from 'next/image';
import {
	FC
} from 'react';


import Button from './button';
import { Edit, Trash } from 'lucide-react';

interface ThumbnailProps {
	image: string;
	title?: string
	editable?: boolean;
}

const Thumbnail: FC<ThumbnailProps> = ({
	image, title, editable = false
}) => {
	return (
		<div className='relative w-full rounded-md h-72 group'>
			<Image src={image} layout='fill' objectFit='cover' objectPosition='center' alt={title||""} className='rounded-md group-hover:scale-105' />
			<div className='absolute inset-0 rounded-md bg-dark/20' />
			{
				title &&
				<div className='absolute bottom-0 left-0 right-0 p-4 text-white rounded-md bg-gradient-to-t from-dark to-transparent'>
					{title}
				</div>
			}
			<div className='absolute flex items-center space-x-2 top-4 right-4'>
				<Button icon={Trash} />
				{editable && <Button icon={Edit} />}
			</div>
		</div>
	);
};

export default Thumbnail;
