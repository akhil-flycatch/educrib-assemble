import {
	DetailedHTMLProps,
	FC, FormHTMLAttributes, ReactNode
} from 'react';

interface FormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	children: ReactNode
}

const Form: FC<FormProps> = ({
	children,
	onSubmit,
	name
}) => {
	return (
		<form name={name} onSubmit={onSubmit} className='flex flex-col space-y-4'>
			{children}
		</form>
	);
};

export default Form;
