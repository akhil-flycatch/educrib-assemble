import Image from 'next/image';
import Tag from '@ui/tag';
import { EnvironmentOutlined } from '@ant-design/icons';

import { IMAGE_SERVER_COLLEGES, LOGO_PLACEHOLDER, COVER_PLACEHOLDER } from '@utils/image';


export default function Avatar({ title, shortAddress, categories, logo, cover, code, region, slug }) {
    return (
        <div className="flex flex-col items-center space-y-14 mb-5 mt-1 md:mt-0">
            <div className="relative flex flex-col items-center">
                <Image src={cover ? `${IMAGE_SERVER_COLLEGES}/uploads/${cover}` : COVER_PLACEHOLDER} alt={`${title}, ${code}`} width={1440} height={491} />
                <img src={logo ? `${IMAGE_SERVER_COLLEGES}/logos/${logo}` : LOGO_PLACEHOLDER} alt={`${title} ${shortAddress}`} className="absolute -bottom-10 rounded-full shadow-md md:w-32 md:h-32 w-24 h-24" />
                <a href={`/${region.toLowerCase()}/colleges/${slug}/feedback`}>
                    <button className="button absolute top-0 right-0">Feedback</button>
                </a>
            </div>
            <div className="flex flex-col space-y-2 items-center">
                <h1 className="md:text-2xl text-xl font-bold text-center">{title}</h1>
                {shortAddress &&
                    <div className="flex space-x-1 items-center">
                        <EnvironmentOutlined />
                        <span className="text-lavender font-semibold">{shortAddress}</span>
                    </div>}
                <div className="flex space-x-2">
                    {categories && categories.map(category => <Tag key={category} text={category} theme="GRADIENT_ONE" />)}
                </div>
            </div>
        </div>
    )
}
