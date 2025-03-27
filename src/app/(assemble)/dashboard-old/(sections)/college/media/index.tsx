// import Links from '@components/college/media/links';
// import Social from '@components/college/media/social';
import Button from '@elements/button';
import Cta from '@elements/cta';

import Links from './links';
import SocialForm from './social';
import { Plus, Video } from 'lucide-react';

interface MediaProps {
	video?: string | null;
	virtualTour?: string | null;
	website?: string;
	eBrochure?: string | null;
	facebook?: string;
	instagram?: string;
	twitter?: string;
	linkedin?: string;
	google?: string;
}

export default function Media({
	video,
	virtualTour,
	website,
	eBrochure,
	facebook,
	instagram,
	twitter,
	linkedin,
	google
}: MediaProps) {
	return (
		<div className='flex flex-col space-y-4'>
			<Cta text='Media' action={<Button icon={Plus}>Add Media</Button>} icon={Video} />
			<div className='flex flex-col space-y-4'>
				<Links
					video={video}
					virtualTour={virtualTour}
					eBrochure={eBrochure}
					website={website}
				/>
				<SocialForm
					facebook={facebook}
					instagram={instagram}
					twitter={twitter}
					linkedin={linkedin}
					google={google}
				/>
			</div>
		</div>
	);
}
