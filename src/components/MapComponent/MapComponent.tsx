import * as React from 'react';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
// import { defaultProps } from 'recompose';

const MapWithAMarker = (withGoogleMap(props =>
    <GoogleMap
        defaultZoom={8}
        // @ts-ignore
        defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
        <Marker
            // @ts-ignore
            position={{ lat: props.lat, lng: props.lng }}
        />
    </GoogleMap>
));



// var address = "41 Green Ln, Handsworth, Birmingham, West Midlands B21 0DE, UK";
// var geocoder = new google.maps.Geocoder();


// geocoder.geocode({ 'address': address }, function (results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//         var marker = new google.maps.Marker({
//             // @ts-ignore
//             map: MapComponent,
//             position: results[0].geometry.location
//         });
//     } else {
//         alert("Geocode was not successful for the following reason: " + status);
//     }
// });

// @ts-ignore
const MapComponent = (props: any) => (
    <MapWithAMarker
        // @ts-ignore
        loadingElement={<div style={{ height: `100%` }} />}
        // @ts-ignore
        lat={props.lat}
        // @ts-ignore
        lng={props.lng}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />)

// export default MapComponent;
// @ts-ignore

export class GeoCoderComponent extends React.Component {
    state = { lat: null, lng: null, groupMarkers: [] }
    getLat = async () => {
        const address = "7 rue montaigne, Cannes, 06400, France";
        const geocoder = new google.maps.Geocoder();



        await geocoder.geocode({ 'address': address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                // @ts-ignore
                return results[0] && this.state.groupMarkers.push(results[0].geometry.location)

            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        })
        // @ts-ignore
        // return groupMarkers[0] && groupMarkers[0];


    };

    // getLng = () => {
    //     const address = "7 rue montaigne, Cannes, 06400, France";
    //     const geocoder = new google.maps.Geocoder();
    //     const lng = geocoder.geocode({ 'address': address }, (results: any, status: any) => {
    //          this.setState({ results })
    //     });
    // console.log(this, lng)
    // };

    render() {
        console.log(this);


        // const address = "7 rue montaigne, Cannes, 06400, France";
        // const geocoder = new google.maps.Geocoder();
        // const lat = geocoder.geocode({ 'address': address }, (results, status) => {
        //     return results[0].geometry.location.lat()
        // });
        // const lng = geocoder.geocode({ 'address': address }, (results, status) => {
        //     return results[0].geometry.location.lng()
        // });
        // console.log(lat, lng);

        // // console.log(() => this.getLat(), () => this.getLng());



        return (

            <MapComponent lat={-34.397} lng={150.644} />
        )
    }
};


export default GeoCoderComponent