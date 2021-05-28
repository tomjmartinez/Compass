import React, { Component, useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import axios from 'axios';

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
      currentLocation: {
        title: "",
        name: "",
        position: {lat: "", lng: ""}
      },
      seeking: {
        title: "",
        name: "",
        position: {lat: "", lng: ""}
      },
      markers: [],
      testMarkers: this.props.geoCaches ? this.props.geoCaches.caches : []
    };
  }

  currentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState(previousState => {
          return {
            currentLat: position.coords.latitude,
            currentLng: position.coords.longitude,
            currentLocation: {
              title: "Current Location",
              name: "Current Location",
              position: { lat: position.coords.latitude, lng: position.coords.longitude }
            }
          };
        });
      });
    }
  }

  getSeeking(){
    const config = {
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
      }
    }
    axios.get("http://localhost:8000/my-app/api/geocache/" + localStorage.getItem("seeking"), config)
    .then(response => {
      if(response.data != "") {
        this.setState(previousState => {
          return {
            seeking: {
              title: response.data.description,
              name: response.data.description,
              position: { lat: response.data.location.y, lng: response.data.location.x}
            }
          };
        });
      }
      })
  }

  componentDidMount() {
    this.currentLocation();
    this.getSeeking();
  }

  handleCheckout = (event) =>{

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
    this.state.markers.forEach((marker) => {
      newMarkers.push(marker)
    })
    this.setState(previousState => {
      return {
        markers: newMarkers,
        testMarkers: []
      };
    });
  }

  render() {
    this.currentLocation();
    if(typeof this.state.testMarkers != undefined) {
      this.fixMarkers();
    }
    return (
      <div>
      {this.props.geoCaches.handleCheckout ? <button onClick={this.handleCheckout.bind(this)} value={this.state.activeMarker == null ? "" : this.state.activeMarker.id}>Checkout</button> : ""}
      <Map
        google={this.props.google}
        zoom={12}
        className={"map"}
        center={{ lat: this.state.currentLat, lng: this.state.currentLng }}
        style={mapStyles}
      >
        <Marker
          title={this.state.currentLocation.title}
          name={this.state.currentLocation.name}
          position={this.state.currentLocation.position}
          onClick={this.onMarkerClick}
        />
        <Marker
          title={this.state.seeking.title}
          name={this.state.seeking.name}
          position={this.state.seeking.position}
          icon={
            {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
          }
          onClick={this.onMarkerClick}
        />
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