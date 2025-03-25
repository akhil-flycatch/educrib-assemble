import React from 'react';

interface ReviewItemProps {
	name: string;
	review: string;
}

function ReviewItem({
	name,
	review
}: ReviewItemProps) {
	return (
		<div className='p-4 rounded-md shadow bg-light'>
			<div className='flex flex-col space-x-2'>
				<div className='flex items-center space-x-8'>
					<span className='p-2 rounded-md text-dark bg-accent1'>
						3.45
					</span>
					<div className='flex flex-col space-y-4'>
						<span className='font-bold'>{name}</span>
						<span className='text-dark'>{review}</span>
						<span className='text-xs text-primary'>2 days ago</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Reviews() {
	return (
		<div className='flex flex-col space-y-2'>
			<ReviewItem name='John Doe' review='Our college offers a number of opportunities for students to get placed in different companies including MNCs like TCS, Wipro, Capgemin etc' />
			<ReviewItem name='Steve Smith' review='Well, no companies had come to our college in search for students to offer them an internship' />
			<ReviewItem name='Jason Roy' review='Higher in core jobs, Many students started their own start-ups' />
			<ReviewItem name='John Doe' review='Our college offers a number of opportunities for students to get placed in different companies including MNCs like TCS, Wipro, Capgemin etc' />
			<ReviewItem name='Steve Smith' review='Well, no companies had come to our college in search for students to offer them an internship' />
			<ReviewItem name='Jason Roy' review='Higher in core jobs, Many students started their own start-ups' />
		</div>
	);
}
