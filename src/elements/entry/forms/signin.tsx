import Button from '@elements/button';
import Form from '@elements/entry/form';
import Email from '@entry/fields/email';
import {
	useRouter
} from 'next/router';
import {
	useState
} from 'react';
import {
	Loader,
	Lock
} from 'react-feather';
import {
	useForm
} from 'react-hook-form';

const SigninForm = () => {

	const [
		loading, setLoading
	] = useState(false);
	const router = useRouter();

	const onSubmit = async (data: any) => {
		const {
			email
		} = data;
		try {
			setLoading(true);
			// const {
			// 	error
			// } = await supabase.auth.signIn({
			// 	email
			// });
			// if (error) throw error;
			console.log('email', email);
			router.push('magiclink');
		} catch (error: any) {
			router.push('signin?error=auth');
		} finally {
			setLoading(false);
		}
	};

	const {
		register, handleSubmit
	} = useForm();

	if (loading) return (
		<div className='flex items-center space-x-2'>
			<Loader className='animate-spin' />
			<span>Authenticating</span>
		</div>
	);

	return (
		<Form name='sign-in-form' onSubmit={handleSubmit(onSubmit)}>
			<Email register={register} />
			<Button disabled={loading} icon={Lock}>Continue with Email Address</Button>
		</Form>
	);
};

export default SigninForm;