import { StaffItemProps } from '@/types/college';
import Text from '@elements/text';
import Thumbnail from '@elements/thumbnail';
import { Mail, PhoneCall } from 'lucide-react';


export default function StaffItem({
	image,
}: StaffItemProps) {
	return (
		<div className='flex flex-col mb-6 space-y-1'>
			<Thumbnail image={image} editable />
			<div className='pt-2 font-semibold'>Staff Name</div>
			<Text icon={PhoneCall}>9447287308</Text>
			<Text icon={Mail}>staff@college.com</Text>
		</div>
	);
}