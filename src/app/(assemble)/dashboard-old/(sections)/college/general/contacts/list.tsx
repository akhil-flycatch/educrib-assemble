// TODO: Handles no facilities condition

import ContactItem from './item';

export default function ContactList({contacts}: any) {
	return (
		<div className='grid grid-cols-2 gap-4'>
			{contacts?.map((contact: any,index:number) => <ContactItem key={index} contact={contact} />)}
			
		</div>
	);
}
