import {
	ReactNode
} from 'react';

export interface LayoutProps {
	title: string;
	children: ReactNode;
}

export interface AuthLayoutProps extends LayoutProps {
	footerLinkTitle?: string;
	footerLink?: string;
	showFooterLink?: boolean
}