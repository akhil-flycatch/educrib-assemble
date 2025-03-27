import { useState, useEffect } from 'react';
import { connectGeoSearch } from 'react-instantsearch-dom';
import { MapboxScene, Marker, PointLayer, Control } from '@antv/l7-react';
import { MAPBOX_KEY, LATITUDE, LONGITUDE } from '@utils/map';
import uuid from 'react-uuid';
import CustomMaker from './marker';

function GeoSearch({ hits }) {
	const [data, setData] = useState({ "type": "FeatureCollection", features: [] });

	useEffect(() => {
		const features = [];
		if (hits && hits.length > 0) {
			hits && hits.map(hit => {
				if (hit._geoloc) {
					features.push({
						"type": "Feature",
						"properties": {
							"name": hit.title
						},
						"geometry": {
							"type": "Point",
							"coordinates": [hit._geoloc.lng, hit._geoloc.lat]
						}
					})
				}
			})
		}
		setData({ "type": "FeatureCollection", features });
	}, [hits]);


	return (
		<MapboxScene
			option={{
				logoVisible: false
			}}
			map={{
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [LONGITUDE, LATITUDE],
				zoom: 10,
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
			<Control type="zoom" position="topleft" />
			<PointLayer
				source={{
					data
				}}
				options={{
					autoFit: true
				}}
			>
				{
					data
					&& data.features
					&& data.features.map(feature => (
						<Marker
							key={uuid()}
							lnglat={feature.geometry.coordinates}
						>
							<CustomMaker title={feature.properties.name} />
						</Marker>
					))
				}
			</PointLayer>
		</MapboxScene>
	)
}

const Map = connectGeoSearch(GeoSearch);

export default Map;
