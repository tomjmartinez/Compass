import React, { Component, useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

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
      currentLat: 34,
      currentLng: -118,
      selectedPlace: props,
      activeMarker: props,
      showingInfoWindow: true,
      markers: [],
      testMarkers: props.geoCaches || []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState(previousState => {
          return {
            currentLat: position.coords.latitude,
            currentLng: position.coords.longitude,
            markers: [
              ...previousState.markers,
              {
                title: "Current Location",
                name: "Current Location",
                position: { lat: position.coords.latitude, lng: position.coords.longitude }
              }
            ]
          };
        });
      });
    }

    const interval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          if(position.coords.latitude != this.state.currentLat || position.coords.longitude != this.state.currentLng) {
            this.setState(previousState => {
              return {
                currentLat: position.coords.latitude,
                currentLng: position.coords.longitude,
                markers: [
                  ...previousState.markers,
                  {
                    title: "Current Location",
                    name: "Current Location",
                    position: { lat: position.coords.latitude, lng: position.coords.longitude }
                  }
                ]
              };
            });
          }
        });
      }
      return;
    }, 60000)
  }

  onLoad() {
    
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
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  fixMarkers() {
    if(this.state.testMarkers.length == 0) {
      return;
    }
    const newMarkers = [];
    this.state.testMarkers.forEach((marker) => (
      newMarkers.push({
        title: marker.description,
        name: marker.description,
        gifter: marker.gifter,
        position: {lat: marker.location.y, lng: marker.location.x},
      })
    ))
    this.setState(previousState => {
      return {
        currentLat: -90,
        markers: newMarkers,
        testMarkers: []
      };
    });
  }

  render() {
    this.fixMarkers();
    return (
      <Map
        google={this.props.google}
        zoom={12}
        className={"map"}
        center={{ lat: this.state.currentLat, lng: this.state.currentLng }}
        style={mapStyles}
        onClick={this.onClick}
      >
        {this.state.markers.map((marker) => (
            <Marker
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
}

export default GoogleApiWrapper(
  (props) => ({
    apiKey: 'AIzaSyB1dfOSar0Tt4sm84JntjfLujmj8GE_u8I',
    markers: props.geoCaches,
  }
))(MapComponent)