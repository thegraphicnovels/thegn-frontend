import React, {useRef} from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './mapMarker';

const MapComponent = () => {
	const mapWrap = useRef(null);
	const center = { lat: 37.546066, lng: 127.0867 };
	const zoom = 17;
	return (
		<div className="mapWrap" ref={mapWrap}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyDnC-SfRiE5RMUSx8perOl7NkWULn53Gu4' }}
				defaultCenter={center}
				defaultZoom={zoom}
			>
				<Marker
					lat={37.546066}
					lng={127.0867}
					name="The Graphic Novels"
					color="blue"
				/>
			</GoogleMapReact>
		</div>
	);
};

export default MapComponent;
