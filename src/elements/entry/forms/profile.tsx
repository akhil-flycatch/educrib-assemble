import Button from '@elements/button';
import Form from '@elements/entry/form';
import Admin from '@entry/fields/admin';
import Avatar from '@entry/fields/avatar';
import Email from '@entry/fields/email';
import Phone from '@entry/fields/phone';
import Link from 'next/link';
import {
	Check
} from 'react-feather';
import {
	useForm
} from 'react-hook-form';;

const ProfileForm = () => {

	const {
		register, handleSubmit
	} = useForm();
	const onSubmit = (data: any) => console.log(data);
	return (
		<Form name='profile-form' onSubmit={handleSubmit(onSubmit)}>
			<Avatar register={register} />
			<Admin register={register} />
			<Phone register={register} />
			<Email register={register} />
			<Link href='/new'>
				<Button icon={Check}>Continue</Button>
			</Link>
		</Form>
	);
};

export default ProfileForm;