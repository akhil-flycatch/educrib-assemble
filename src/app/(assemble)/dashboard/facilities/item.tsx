import Avatar from '@elements/avatar';
import { Coffee } from 'lucide-react';


export default function FacilityItem({
	facility
}: { facility: string }) {
	return (
		<div className='flex items-center p-4 space-x-8 rounded-md shadow bg-light'>
			<Avatar icon={Coffee} />
			<span className='font-semibold'>{facility}</span>
		</div>
	);
}
