import Button from '@elements/button';
import Cta from '@elements/cta';
import PlacesForm from '@entry/forms/places';
import { MapPin, Save } from 'lucide-react';


export default function Location() {
	return (
		<div className='flex flex-col space-y-4'>
			<Cta text='Location'
				action={<Button icon={Save}>Save Contact</Button>} icon={MapPin} />
			<PlacesForm />
		</div>
	);
}
