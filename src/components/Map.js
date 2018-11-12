import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
        };

        this._onClick = this._onClick.bind(this);


    }
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33,
        },
        zoom: 11

    };

    _onClick = ({ x, y, lat, lng, event }) => console.log(x, y, lat, lng, event)
    render() {
        const marker = ({ text }) => <div>{text}</div>;
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '500px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBO44rZ_b8rP8r1B2hBxkwJZtlPlVR6MEI' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    onClick={this._onClick}
                >
                    <Marker
                        lat={59.955413}
                        lng={30.337844}
                        text={'Kreyser Avrora'}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;