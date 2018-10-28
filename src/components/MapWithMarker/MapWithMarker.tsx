import * as React from 'react';
import MapComponent from '../MapComponent'
import { IMapWithMarker } from './MapWithMarker.d'

export class MapWithMarker extends React.Component<IMapWithMarker> {
    state = { lat: null, lng: null }
    componentDidMount() {
        this.renderMap()
    }
    async renderMap() {
        // const address = "7 rue montaigne, Cannes, 06400, France";
        const geocoder = new google.maps.Geocoder();
        const loc = async () => {
            await geocoder.geocode({ 'address': this.props.address }, (geocoderResults) => {
                this.setState({ lat: geocoderResults[0].geometry.location.lat(), lng: geocoderResults[0].geometry.location.lng() })
            })
        }
        loc().then(results => console.log(results));
    }

    render() {
        const { lat, lng } = this.state
        return (
            <>
                {lat && <MapComponent lat={lat} lng={lng} />}
            </>
        )
    }
};


export default MapWithMarker
