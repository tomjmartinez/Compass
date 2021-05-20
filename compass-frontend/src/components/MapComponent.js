import React, { Component, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './CurrentLocationComponent';

const mapStyles = {
  disableDefaultUI: true,
  position: 'absolute',
  width: '85%',
  height: '85%',
  zoomControl: true,
  streetViewControl: false
};

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: props,
      activeMarker: props,
      showingInfoWindow: true,
      markers: [
        {
          title: "The marker`s title will appear as a tooltip.",
          name: "SOMA",
          position: { lat: 37.778519, lng: -122.40564 }
        }
      ]
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(previousState => {
      return {
        markers: [
          ...previousState.markers,
          {
            title: "",
            name: "",
            position: { lat, lng }
          }
        ]
      };
    });
    console.log(this.state.markers);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
    console.log(this.state);
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  // <Map
  //         google={this.props.google}
  //         style={{ width: "80%", margin: "auto" }}
  //         className={"map"}
  //         zoom={14}
  //         onClick={this.onClick}
  //       >
  //         {this.state.markers.map((marker, index) => (
  //           <Marker
  //             key={index}
  //             title={marker.title}
  //             name={marker.name}
  //             position={marker.position}
  //           />
  //         ))}
  //       </Map>

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        className={"map"}
        style={mapStyles}
        onClick={this.onClick}
      >
        {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              name={marker.name}
              position={marker.position}
              onClick={this.onMarkerClick}
            />
          ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }

  // render() {
  //   return (
  //     <CurrentLocation
  //       centerAroundCurrentLocation
  //       google={this.props.google}
  //       onClick={this.onClick}
  //     >
  //       <Marker onClick={this.onMarkerClick} name={'Current Location'} />
  //       <InfoWindow
  //         marker={this.state.activeMarker}
  //         visible={this.state.showingInfoWindow}
  //         onClose={this.onClose}
  //       >
  //         <div>
  //           <h4>{this.state.selectedPlace.name}</h4>
  //         </div>
  //       </InfoWindow>
  //     </CurrentLocation>
  //   );
  // }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB1dfOSar0Tt4sm84JntjfLujmj8GE_u8I'
})(MapComponent);