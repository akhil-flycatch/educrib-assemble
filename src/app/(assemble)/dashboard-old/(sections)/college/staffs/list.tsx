
import StaffItem from './item';

export default function StaffList() {
	return (
		<div className='grid grid-cols-3 gap-4'>
			<StaffItem image='/mock/user1.jpg' />
			<StaffItem image='/mock/user2.jpg' />
			<StaffItem image='/mock/user1.jpg' />
			<StaffItem image='/mock/user2.jpg' />
			<StaffItem image='/mock/user1.jpg' />
			<StaffItem image='/mock/user2.jpg' />
			<StaffItem image='/mock/user1.jpg' />
			<StaffItem image='/mock/user2.jpg' />
			<StaffItem image='/mock/user1.jpg' />
			<StaffItem image='/mock/user2.jpg' />
			<StaffItem image='/mock/user1.jpg' />
			<StaffItem image='/mock/user2.jpg' />
		</div>
	);
}
