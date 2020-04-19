import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './mapMarker';

const MapComponent = () => {
  const center = { lat: 37.546066, lng: 127.0867 };
  const zoom = 17;
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCjWt4pUBDu5cTtSxAq_L93PPG_prg7VEI' }}
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
