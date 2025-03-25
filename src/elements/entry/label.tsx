import {
	DetailedHTMLProps,
	FC, LabelHTMLAttributes
} from 'react';

interface LabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
	children: string;
}

const Label: FC<LabelProps> = ({
	children,
	htmlFor
}) => {
	return (
		<label htmlFor={htmlFor} className='pl-2 text-sm'>{children}</label>
	);
};

export default Label;
