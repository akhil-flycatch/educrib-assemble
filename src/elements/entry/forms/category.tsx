import VERTICALS from 'config/verticals';
import cuid from 'cuid';
import Link from 'next/link';

const CategoryForm = () => {
	const selected = 'Colleges';
	return (
		<div className='grid grid-cols-3 gap-4'>
			{VERTICALS.map(item => (
				<Link href='/onboard' key={cuid()}>
					<div className={` ${selected === item.title ? 'bg-secondary text-white border-secondary' : 'bg-white text-dark border-dark/20'} z-10 flex items-center justify-center p-4 font-semibold transform border rounded-md cursor-pointer hover:bg-accent1 hover:text-dark hover:border-accent1 hover:scale-105 hover:shadow`} >
						{item.title}
					</div>
				</Link>
			))}
		</div>
	);
};

export default CategoryForm;