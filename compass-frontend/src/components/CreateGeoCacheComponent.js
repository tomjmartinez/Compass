import React, { Component, useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import {Container, Row, Col, Form, FormGroup, Label, Input, Button, NavLink} from "reactstrap";
import axios from "axios";

const mapStyles = {
  disableDefaultUI: true,
  position: 'absolute',
  width: '85%',
  height: '50%',
  zoomControl: true,
  streetViewControl: false
};

class CreateGeoCacheComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLat: 0,
      currentLng: 0,
      selectedPlace: props,
      activeMarker: props,
      showingInfoWindow: true,
      newLat: 0,
      newLng: 0,
      mysteryFlag: false,
      description: "",
      timeLimit: ""
    };
    this.onClick = this.onClick.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState(previousState => {
          return {
            currentLat: position.coords.latitude,
            currentLng: position.coords.longitude,
            markers: [
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

  onClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(previousState => {
      return {
        newLat: lat,
        newLng: lng
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

  handleSubmit(event){
      event.preventDefault();

      const form = {
        //insert current user id here
        coordinates: [this.state.newLat, this.state.newLng],
        // mysteryFlag: this.state.mysteryFlag,
        description: this.state.description,
        timeLimit: this.state.timeLimit
      }

      axios.post(`http://localhost:8000/my-app/api/newGeoCache`, form,
      { headers:{'Content-Type': 'application/json'}, }
      ).then(res => {console.log(res.data); })
  }

  handleNextPath(path){
      this.props.history.push(path);
  }

  handleDescriptionChange(event){
      this.setState({description: event.target.value});
      console.log(this.state.description);
  }

  handleTimeChange(event){
      this.setState({timeLimit: event.target.value});
      console.log(event.target.value);
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
            <h1>
                <span className={"font-weight-bold"}>Compass Login</span>
            </h1>
            <Row className={"accountRows"}>
                <Col >
                    <FormGroup className={"inputs"}>
                        <Label>Description</Label>
                        <Input type={"text"} name={"description"}
                                id={"cacheDescription"}  value={this.state.description}
                                onChange={this.handleDescriptionChange}
                                placeholder={"description"} required>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row className={"accountRows"}>
                <Col>
                    <FormGroup className={"inputs"}>
                        <Label>Time Limit</Label>
                        <Input type={"text"} name={"timeLimit"}
                                id={"cacheTimeLimit"} value={this.state.timeLimit}
                                onChange={this.handleTimeChange}
                                placeholder={"time limit on cache (minutes)"} required>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row className={"accountRows"}>
                <Col>
                    <Button variant="success" >Submit</Button>
                </Col>
            </Row>
        </Form>
        <Map
          google={this.props.google}
          zoom={12}
          className={"map"}
          center={{ lat: this.state.currentLat, lng: this.state.currentLng }}
          style={mapStyles}
          onClick={this.onClick}
        >
        <Marker title="Current Location" name="Current Location" position={{lat: this.state.currentLat, lng: this.state.currentLng}} onClick={this.onMarkerClick}/>
        <Marker title="New GeoCache Location" name="New Geocache Location" position={{lat: this.state.newLat, lng: this.state.newLng}} onClick={this.onMarkerClick}/>
        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}onClose={this.onClose} >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </Map>
      </Container>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB1dfOSar0Tt4sm84JntjfLujmj8GE_u8I'
})(CreateGeoCacheComponent);