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
    console.log(props);
    this.state = {
      currentLat: 34,
      currentLng: -118,
      selectedPlace: props,
      activeMarker: props,
      showingInfoWindow: true,
      markers: [],
      testMarkers: this.props.geoCaches ? this.props.geoCaches.caches : []
    };
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

  handleCheckout = (event) =>{
    console.log(event)
    this.props.geoCaches.handleCheckout(event);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      currentLat: marker.position.lat(),
      currentLng: marker.position.lng()
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
    if(this.state.testMarkers == undefined) {
      return;
    }
    if(this.state.testMarkers.length == 0) {
      return;
    }
    const newMarkers = [];
    this.state.testMarkers.forEach((marker) => (
      newMarkers.push({
        id: marker.id,
        title: marker.cache.description,
        name: marker.cache.description,
        gifter: marker.cache.gifter,
        finder: marker.cache.finder,
        timeLimit: marker.cache.timeLimit,
        position: {lat: marker.cache.location.y, lng: marker.cache.location.x},
      })
    ))
    this.setState(previousState => {
      return {
        markers: newMarkers,
        testMarkers: []
      };
    });
  }

  render() {
    if(typeof this.state.testMarkers != undefined) {
      this.fixMarkers();
    }
    console.log(this.state.activeMarker)
    return (
      <div>
      <button onClick={this.handleCheckout.bind(this)} value={this.state.activeMarker == null ? "" : this.state.activeMarker.id}>Checkout</button>
      <Map
        google={this.props.google}
        zoom={12}
        className={"map"}
        center={{ lat: this.state.currentLat, lng: this.state.currentLng }}
        style={mapStyles}
      >
        {this.state.markers.map((marker) => (
            <Marker
              id={marker.id}
              title={marker.title}
              name={marker.name}
              gifter={marker.gifter}
              timeLimit={marker.timeLimit}
              position={marker.position}
              onClick={this.onMarkerClick}
            />
          ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClick={this.handleCheckout}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            {this.state.selectedPlace.timeLimit ? <p>Time Limit: {this.state.selectedPlace.timeLimit} </p> : <p></p>}
            {this.state.selectedPlace.gifter ? <p>Gifted By: {this.state.selectedPlace.gifter} </p> : <p></p>}
            {this.state.selectedPlace.finder ? <p>Found By: {this.state.selectedPlace.finder} </p> : <p></p>}
          </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper(
  (props) => ({
    apiKey: 'AIzaSyB1dfOSar0Tt4sm84JntjfLujmj8GE_u8I',
    markers: props.geoCaches,
  }
))(MapComponent)