import * as React from 'react';
import MapComponent from '../MapComponent';
import { IMapWithMarker } from './MapWithMarker.d';

export class MapWithMarker extends React.Component<IMapWithMarker> {
  renderMap = (lat: any, lng: any) => <MapComponent lat={lat} lng={lng} />;

  render() {
    const { lat, lng } = this.props;
    return <div>{this.renderMap(lat, lng)}</div>;
  }
}

export default MapWithMarker;
