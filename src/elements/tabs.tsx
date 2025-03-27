import {
	Tab
} from '@headlessui/react';
import React, {
	FC,
	Fragment,
	ReactNode
} from 'react';
import {
	Icon
} from 'react-feather';

interface TabProps {
	items: {
		icon?: Icon;
		name: string;
		content: ReactNode
	}[]
}

const Tabs: FC<TabProps> = ({
	items
}) => {
	return (
		<Tab.Group>
			<Tab.List className='flex items-center space-x-2'>
				{items && items.map(item => (
					<Tab as={Fragment} key={`${item.name}-name`}>
						{({
							selected
						}) => (
							<div className={`${selected ? 'bg-secondary text-light' : 'bg-light'} px-4 py-2 rounded-md cursor-pointer  hover:bg-accent1 hover:text-dark outline-none flex items-center space-x-2`}>
								{item.icon && <span>{React.createElement(item.icon, {
									size: 14
								})}</span>}
								<span >{item.name}</span>
							</div>
						)}
					</Tab>
				))}
			</Tab.List>
			<Tab.Panels>
				{items && items.map(item => (
					<Tab.Panel key={`${item.name}-content`}>
						{item.content}
					</Tab.Panel>
				))}
			</Tab.Panels>
		</Tab.Group>
	);
};

export default Tabs;
