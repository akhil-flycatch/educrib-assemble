"use client";

import { MENU_DEFAULT_COLLAPSED } from '@/config/menu';
import { MenuIcon } from 'lucide-react';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/compat/router'
import Logo from './logo';
import { split } from 'postcss/lib/list';
import path from 'path';

interface MenuItems {
    title: string;
    icon?: ReactNode;
    link?: string;
    collapsed?: boolean;
    active?: boolean;
}

interface MenuProps {
    items: MenuItems[];
    collapsed?: boolean;
}

const MenuItem: FC<MenuItems> = ({
    title, icon, link = '#', collapsed, active
}) => {

    const activeClass = active ? 'bg-[#DFD4FF]' : '';

    if (collapsed) {
        return (
            <a href={link} className={`flex flex-col items-center px-6 py-4 space-y-2 hover:bg-dark/20 ${activeClass}`}>
                {icon}
                <span className='text-xs'>{title}</span>
            </a>
        );
    }

    return (
        <a href={link} className={`flex py-4 pl-6 pr-12 space-x-4 text-[#243757] w-[216px] h-[48px] rounded-[10px] items-center hover:bg-dark/20 ${activeClass}`}>
            {icon}
            <span>{title}</span>
        </a>
    );
};

const Menu: FC<MenuProps> = ({
    items, collapsed = MENU_DEFAULT_COLLAPSED
}) => {
    const [collapsedMenu, setCollapsedMenu] = useState(() => collapsed);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
	const splited=router?.pathname.split('/');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className='flex flex-col items-center justify-start h-screen overflow-y-scroll text-white bg-white max-w-max no-scollbar p-5'>
            <Logo />

            <span className='p-6 cursor-pointer'>
                {/* <MenuIcon onClick={() => setCollapsedMenu(!collapsedMenu)} /> */}
            </span>
            <div className='flex flex-col gap-[20px]'>
                {items && items.map(item => {
                    const isActive = router?.pathname.includes(item.title || '');
                    return <MenuItem collapsed={collapsedMenu} key={item.title} {...item} active={isActive} />;
                })}
            </div>
        </div>
    );
};

export default Menu;
