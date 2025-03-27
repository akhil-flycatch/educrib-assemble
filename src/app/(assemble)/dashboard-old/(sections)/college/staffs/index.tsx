import Button from '@elements/button';
import Cta from '@elements/cta';


import StaffList from './list';
import { Plus } from 'lucide-react';

export default function Staffs() {
	return (
		<div className='flex flex-col space-y-4'>
			<Cta text='12 Staffs' action={<Button icon={Plus}>Add Staff</Button>} />
			<StaffList />
		</div>
	);
}
