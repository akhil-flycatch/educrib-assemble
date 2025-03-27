import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
    HomeOutlined,
    BookOutlined,
    ShopOutlined,
    CameraOutlined,
    BankOutlined,
    FileOutlined,
    StarOutlined,
    CoffeeOutlined,
    CrownOutlined
} from "@ant-design/icons";
import Container from './components/container';
import Empty from './components/empty';
import Tab from './components/tab';
import Contact from './contact';
import Overview from './overview';
import Media from './media';
import Info from './info';

const Location = dynamic(() => import('./location'), { ssr: false });
const Courses = dynamic(() => import('./courses'));
const Facilities = dynamic(() => import('./facilities'));
const Gallery = dynamic(() => import('./gallery'));

export default function Content({ profile }) {

    const [activeTab, setActiveTab] = useState('overview');

    return (
        <>
            <div className="flex space-x-6 items-center md:justify-center justify-start mb-2 overflow-y-scroll md:overflow-y-hidden">
                <Tab
                    label="Overview"
                    icon={<HomeOutlined />}
                    onClick={() => setActiveTab('overview')}
                    active={activeTab === 'overview'}
                />
                {/* <Tab
                    label="Courses"
                    icon={<BookOutlined />}
                    onClick={() => setActiveTab('courses')}
                    active={activeTab === 'courses'}
                />
                <Tab
                    label="Facilities"
                    icon={<ShopOutlined />}
                    onClick={() => setActiveTab('facilities')}
                    active={activeTab === 'facilities'}
                />
                <Tab
                    label="Gallery"
                    icon={<CameraOutlined />}
                    onClick={() => setActiveTab('gallery')}
                    active={activeTab === 'gallery'}
                />
                <Tab
                    label="Hostel"
                    icon={<BankOutlined />}
                    onClick={() => setActiveTab('hostel')}
                    active={activeTab === 'hostel'}
                />
                <Tab
                    label="News"
                    icon={<FileOutlined />}
                    onClick={() => setActiveTab('news')}
                    active={activeTab === 'news'}
                />
                <Tab
                    label="Placements"
                    icon={<StarOutlined />}
                    onClick={() => setActiveTab('placements')}
                    active={activeTab === 'placements'}
                />
                <Tab
                    label="Events"
                    icon={<CoffeeOutlined />}
                    onClick={() => setActiveTab('events')}
                    active={activeTab === 'events'}
                />
                <Tab
                    label="Scholarships"
                    icon={<CrownOutlined />}
                    onClick={() => setActiveTab('scholarships')}
                    active={activeTab === 'scholarships'}
                /> */}
            </div>
            {activeTab === 'overview' &&
                <>
                    <Info
                        code={profile.code}
                        establishmentYear={profile.establishmentYear}
                        accreditations={profile.accreditations}
                        courses={profile.courses ? profile.courses.length : 0}
                        facilities={profile.facilities ? profile.facilities.length : 0}
                        gallery={profile.gallery ? profile.gallery.length : 0}
                    />
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                        <Container title="Overview">
                            <Overview
                                university={profile.university}
                                management={profile.management}
                                type={profile.type}
                            />
                        </Container>
                        <Container title="Contact">
                            <Contact
                                contact={profile.contact}
                                email={profile.email}
                                address={profile.address}
                            />
                        </Container>
                    </div>
                    {/* {profile._geoloc &&
                        <Container title={`Location of ${profile.title}`} padding={false}>
                            <div className="relative" style={{ height: '400px' }}>
                                <Location
                                    location={profile._geoloc}
                                    title={`${profile.title}, ${profile.code || profile.region}`}
                                />
                            </div>
                        </Container>} */}
                    <Media
                        video={profile.video}
                        virtualTour={profile.virtualTour}
                        website={profile.website}
                        eBrochure={profile.eBrochure}
                    />
                </>
            }
            {/* {activeTab === 'courses' &&
                <Courses courses={profile.courses} />
            }
            {activeTab === 'facilities' &&
                <Container title="Facilities">
                    <Facilities facilities={profile.facilities} />
                </Container>
            }
            {activeTab === 'gallery' &&
                <Container title="Gallery">
                    <Gallery
                        gallery={profile.gallery}
                        title={`${profile.title}, ${profile.code || profile.region}`}
                    />
                </Container>
            }
            {activeTab === 'hostel' &&
                <Container title="Hostel">
                    <Empty item="hostel" />
                </Container>
            }
            {activeTab === 'news' &&
                <Container title="News">
                    <Empty item="news" />
                </Container>
            }
            {activeTab === 'placements' &&
                <Container title="Placemenst">
                    <Empty item="placement" />
                </Container>
            }
            {activeTab === 'events' &&
                <Container title="Events">
                    <Empty item="events" />
                </Container>
            }
            {activeTab === 'scholarships' &&
                <Container title="Scholarships">
                    <Empty item="scholarships" />
                </Container>
            } */}
        </>
    )
}
