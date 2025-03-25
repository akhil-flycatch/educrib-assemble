"use client";
import { NOT_AVAILABLE } from '@/constants/string';
import Button from '@elements/button';
import Card from '@elements/card';
import Modal from '@elements/modal';
import Text from '@elements/text';
import SocialForm from '@entry/forms/social';

import { Edit, Facebook, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import {
	useState
} from 'react';


interface SocialProps {
	facebook?: string;
	instagram?: string;
	twitter?: string;
	linkedin?: string;
	google?: string;
}

export default function Social({
	facebook,
	instagram,
	twitter,
	linkedin,
	google
}: SocialProps) {
	const [
		visible, setVisible
	] = useState(false);
	return (
		<Card title='Social' action={<Button icon={Edit} onClick={() => setVisible(true)}>Edit</Button>}>
			<Text icon={Facebook} label='Facebook'>{facebook || NOT_AVAILABLE}</Text>
			<Text icon={Instagram} label='Instagram'>{instagram || NOT_AVAILABLE}</Text>
			<Text icon={Twitter} label='Twitter'>{twitter || NOT_AVAILABLE}</Text>
			<Text icon={Linkedin} label='Linkedin'>{linkedin || NOT_AVAILABLE}</Text>
			<Text icon={Mail} label='Google'>{google || NOT_AVAILABLE}</Text>
			<Modal visible={visible} onClose={() => setVisible(false)} title='Edit Links'>
				<SocialForm />
			</Modal>
		</Card>
	);
}
