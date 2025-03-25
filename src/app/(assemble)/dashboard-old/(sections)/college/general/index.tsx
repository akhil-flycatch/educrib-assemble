
import Introduction from './introduction';
import Contacts from './contacts';
import Location from './location';
import { GeneralProps } from '@/types/college';

export default function Genreal({
	title,
	university,
	management,
	categories,
	establishmentYear,
	code,
	accreditations,
	type,
	logo,
	cover,
	id,
	contacts,
	published,
	verified,
	profile
}: GeneralProps) {
	return (
		<div className='flex flex-col space-y-4'>
			<Introduction
			profile={profile}
			published={published}
			verified={verified}
				title={title}
				university={university}
				management={management}
				categories={categories}
				establishmentYear={establishmentYear}
				code={code}
				accreditations={accreditations}
				type={type}
				logo={logo}
				cover={cover}
				id={id}
			/>
			<Contacts id={id} contacts={contacts} />
			<Location />
		</div>
	);
}
