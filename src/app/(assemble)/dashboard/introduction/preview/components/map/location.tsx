import { MapboxScene, Marker as MapBoxMarker } from '@antv/l7-react';
import { MAPBOX_KEY } from '@utils/map';
import Marker from './marker';

export default function Location({ location, title }) {
    return (
        <div>
            <MapboxScene
                option={{
                    logoVisible: false
                }}
                map={{
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [location.lng, location.lat],
                    zoom: 14,
                    token: MAPBOX_KEY,
                }}
                style={{
                    position: 'absolute',
                    top: '0px',
                    bottom: '0px',
                    left: '0px',
                    right: '0px',
                }}
            >
                <MapBoxMarker lnglat={[location.lng, location.lat]}>
                    <Marker title={title} />
                </MapBoxMarker>
            </MapboxScene>
        </div>
    )
}
