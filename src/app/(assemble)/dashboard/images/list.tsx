import { COLLEGE_UPLOAD_PATH } from '@/constants/url';
import Thumbnail from '@elements/thumbnail';

import cuid from 'cuid';

interface GalleryProps {
	gallery: string[],
	title: string;
}

export default function GalleryList({
	gallery,
	title
}: GalleryProps) {
	return (
		<div className='grid grid-cols-3 gap-4'>
			{
				gallery
				&& gallery?.length > 0
				&& gallery.map((image, index) => <Thumbnail key={cuid()} image={`${COLLEGE_UPLOAD_PATH}${image}`} title={`${title} - Photo ${index + 1}`} />)
			}
		</div>
	);
}
