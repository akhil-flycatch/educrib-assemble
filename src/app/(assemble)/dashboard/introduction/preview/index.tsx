import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Skeleton } from 'antd';
import Avatar from './avatar';
import Content from './content';

export default function Profile({ profile }) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const tempCategories = [];
        if (profile.courses && profile.courses.length > 0) {
            // find unique categories from courses list
            const uniqueCategories = profile.courses.map(course => course.category)
                .filter((value, index, self) => self.indexOf(value) === index);
            setCategories(uniqueCategories);
        }
    }, [profile]);

    return (
        <>
            <div style={{ paddingTop: "56px" }} className="md:px-28 px-2">
                {profile ?
                    <div className="pt-2">
                        <Avatar
                            title={profile.title}
                            shortAddress={profile.shortAddress}
                            categories={categories}
                            cover={profile.cover}
                            logo={profile.logo}
                            code={profile.code}
                            region={profile.region}
                            slug={profile.slug}
                        />
                        <Content profile={profile} />
                    </div> : <Skeleton active />}
            </div>
           
        </>
    )
}
