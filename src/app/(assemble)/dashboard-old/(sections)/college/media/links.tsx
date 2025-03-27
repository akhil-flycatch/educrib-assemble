"use client";
import { NOT_AVAILABLE } from '@/constants/string';
import Button from '@elements/button';
import Card from '@elements/card';
import Modal from '@elements/modal';
import Text from '@elements/text';
import LinksForm from '@entry/forms/links';

import { Edit, Link } from 'lucide-react';
import {
	useState
} from 'react';


interface LinksProps {
	video?: string | null;
	virtualTour?: string | null;
	website?: string;
	eBrochure?: string | null;
}

export default function Links({
	video,
	virtualTour,
	website,
	eBrochure
}: LinksProps) {
	const [
		visible, setVisible
	] = useState(false);
	return (
		<Card title='Links' action={<Button icon={Edit} onClick={() => setVisible(true)}>Edit</Button>}>
			<Text icon={Link} label='Video'>{video || NOT_AVAILABLE}</Text>
			<Text icon={Link} label='Virtual Tour'>{virtualTour || NOT_AVAILABLE}</Text>
			<Text icon={Link} label='Website'>{website || NOT_AVAILABLE}</Text>
			<Text icon={Link} label='E-Brochure'>{eBrochure || NOT_AVAILABLE}</Text>
			<Modal visible={visible} onClose={() => setVisible(false)} title='Edit Links'>
				<LinksForm />
			</Modal>
		</Card>
	);
}
