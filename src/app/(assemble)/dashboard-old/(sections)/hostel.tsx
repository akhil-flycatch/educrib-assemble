import Button from '@elements/button';
import Card from '@elements/card';
import Text from '@elements/text';
import {
	DollarSign,
	Edit, PhoneCall, User
} from 'lucide-react';

import FacilitiesList from './college/facilities/list';

export default function Hostel({
	facilities
}: {
	facilities: string[]
}) {
	return (
		<div className='grid grid-cols-2 gap-4'>
			<Card title='Gents' action={<Button icon={Edit}>Edit</Button>}>
				<Text icon={User} label='Capacity' > 400</Text>
				<Text icon={DollarSign} label='Deposit'>₹ 3,000</Text>
				<Text icon={DollarSign} label='Admission Fee'>₹ 3,000</Text>
				<Text icon={DollarSign} label='Room Rent'>₹ 23,000 per year</Text>
				<Text icon={DollarSign} label='Mess Fee'>₹ 4,000</Text>
				<Text icon={DollarSign} label='Laundry'>₹ 8,000 per year</Text>
				<Text icon={PhoneCall} label='Contact Person'>Rev.Fr. Sebastian Kilirooparampil</Text>
				<Text icon={PhoneCall} label='Contact Number'>91 9447287308</Text>
			</Card >
			<Card title='Ladies' action={<Button icon={Edit}>Edit</Button>}>
				<Text icon={User} label='Capacity'>400</Text>
				<Text icon={DollarSign} label='Deposit'>₹ 3,000</Text>
				<Text icon={DollarSign} label='Admission Fee'>₹ 3,000</Text>
				<Text icon={DollarSign} label='Room Rent'>₹ 23,000 per year</Text>
				<Text icon={DollarSign} label='Mess Fee'>₹ 4,000</Text>
				<Text icon={DollarSign} label='Laundry'>₹ 8,000 per year</Text>
				<Text icon={PhoneCall} label='Contact Person'>Sr. Maya OSA</Text>
				<Text icon={PhoneCall} label='Contact Number'>91 9447287308</Text>
			</Card>
			<div className='col-span-2'>
				<Card title='Hostel Facilities' action={<Button icon={Edit}>Edit</Button>}>
					<FacilitiesList facilities={facilities} />
				</Card>
			</div>
		</div >
	);
}
