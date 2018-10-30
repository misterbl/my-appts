import * as React from 'react';
import MapComponent from '../MapComponent';
import { IMapWithMarker, IMapWithMarkerState } from './MapWithMarker.d';

export class MapWithMarker extends React.Component<
  IMapWithMarker,
  IMapWithMarkerState
> {
  constructor(props: IMapWithMarker) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
    };
    this.getGeoCode(this.props.address, (searchLatlng: any) => {
      this.setState({ lat: searchLatlng[0] });
      this.setState({ lng: searchLatlng[1] });
    });
  }

  getGeoCode(address: any, callback: any) {
    const geocoder = new google.maps.Geocoder();
    const latlng = new Array(2);

    geocoder.geocode({ address: encodeURI(address) }, function(
      results,
      status,
    ) {
      if (status === google.maps.GeocoderStatus.OK) {
        latlng[0] = results[0].geometry.location.lat();
        latlng[1] = results[0].geometry.location.lng();
        callback(latlng); // call the callback function here
      } else {
        console.log(
          'Geocode was not successful for the following reason: ' + status,
        );
      }
    });
  }

  renderMap = (lat: any, lng: any) => <MapComponent lat={lat} lng={lng} />;

  render() {
    console.log(this);

    const { lat, lng } = this.state;

    return <div>{this.renderMap(lat, lng)}</div>;
  }
}

export default MapWithMarker;
