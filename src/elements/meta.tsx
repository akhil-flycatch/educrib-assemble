
import Head from 'next/head';
import {
	FC
} from 'react';

interface MetaProps {
	title: string;
}

const Meta: FC<MetaProps> = ({
	title
}) => {
	return (
		<Head>
			<title>{`${title || 'Extracting Sweetness of Thins'} | Nectar IT`}</title>
		</Head>
	);
};

export default Meta;
