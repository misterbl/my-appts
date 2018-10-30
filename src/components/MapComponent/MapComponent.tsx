import * as React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { IMapComponent } from './MapComponent.d';

const MapWithAMarker = withGoogleMap((props: IMapComponent) => {
  return (
    <GoogleMap defaultZoom={14} center={{ lat: +props.lat, lng: +props.lng }}>
      <Marker position={{ lat: props.lat, lng: props.lng }} />
    </GoogleMap>
  );
});

const MapComponent = (props: any) => (
  <MapWithAMarker
    loadingElement={<div style={{ height: `100%` }} />}
    lat={props.lat}
    lng={props.lng}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);

export default MapComponent;
