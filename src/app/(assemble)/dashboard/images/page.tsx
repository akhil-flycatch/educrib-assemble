// TODO: Handles no facilities condition

import Button from '@elements/button';
import Cta from '@elements/cta';


import { Image, Plus } from 'lucide-react';
import GalleryList from './list';

interface GalleryProps {
	gallery: string[],
	title: string;
}

export default function Gallery({
	gallery,
	title
}: GalleryProps) {
	return (
		<div className='flex flex-col space-y-4'>
			<Cta text={`${gallery?.length > 0 ? gallery?.length : 0} Images`} action={<Button icon={Plus}>Add Image</Button>} icon={Image} />
			<GalleryList
				gallery={gallery}
				title={title}
			/>
		</div>
	);
}
