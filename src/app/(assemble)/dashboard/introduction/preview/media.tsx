import { GlobalOutlined, VideoCameraOutlined, RocketOutlined, BookOutlined } from '@ant-design/icons';
import Tile from '@ui/tile';

export default function Media({ video, website, virtualTour, eBrochure }) {
    return (
        <div className="grid md:grid-cols-4 grid-cols-2 gap-2 mt-2 md:mt-0">
            <Tile
                title="Website"
                icon={<GlobalOutlined />}
                link={website}
            />
            <Tile
                title="Video"
                icon={<VideoCameraOutlined />}
                link={video}
            />
            <Tile
                title="Virtual Tour"
                icon={<RocketOutlined />}
                link={virtualTour}
            />
            <Tile
                title="Brochure"
                icon={<BookOutlined />}
                link={eBrochure}
            />
        </div>
    )
}
