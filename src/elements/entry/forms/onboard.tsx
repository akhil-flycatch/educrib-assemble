import Button from '@elements/button';
import Form from '@elements/entry/form';
import Hyperlink from '@elements/hyperlink';
import Link from 'next/link';
import {
	Check
} from 'react-feather';
import {
	useForm
} from 'react-hook-form';

import Title from '../fields/title';

const OnboardForm = () => {
	const {
		register, handleSubmit
	} = useForm();
	const onSubmit = (data: any) => console.log(data);
	return (
		<Form name='onboard-form' onSubmit={handleSubmit(onSubmit)}>
			<Title register={register} />
			<Link href='/profile'>
				<Button icon={Check}>Continue</Button>
			</Link>
			<Hyperlink href='#'>My Institution is not listed</Hyperlink>
		</Form>
	);
};

export default OnboardForm;