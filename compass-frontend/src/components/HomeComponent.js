import React from "react";
import {Button, Col, Container, Row} from "reactstrap";
import "../styles/HomeComponent.css";
import {withRouter} from "react-router-dom";
import MyGeoCaches from "./MyGeoCaches";

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangePath = this.handleChangePath.bind(this);
        this.state = {
            lng: 0,
            lat: 0
        }
    }
    handleChangePath(path){
        this.props.history.push(path);
    }

    currentLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              this.setState(previousState => {
                return {
                  lng: position.coords.latitude,
                  lat: position.coords.longitude,
                };
              });
            });
          }
    }

    componentDidMount(){
        this.currentLocation();
    }


    render() {
        this.currentLocation();
        return(
            <Container className={"homePage"}>
                <Row>
                    <Col>
                        <div className={"homeItem"}>
                            <h1> Home </h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Button className={"btn-view-caches"} onClick={()=>this.handleChangePath('/my-geocaches')}> My Caches</Button>
                </Row>
                <Row>
                    <Button className={"btn-view-caches"} onClick={()=>this.handleChangePath('/avail-geocaches')}> View Available Caches</Button>
                </Row>
                <Row>
                    <Button className={"btn-add-caches"} onClick={()=>this.handleChangePath('/create-geocaches')}>Add Cache</Button>
                </Row>
                <Row>
                    <Button className={"btn-near-caches"} onClick={()=>this.handleChangePath('/near-geocaches')}> View Near Caches</Button>
                </Row>
                <Row>
                    <Button className={"btn-view-caches"} onClick={()=>this.handleChangePath('/all-geocaches')}> All Caches</Button>
                </Row>
                <Row>
                    <Col>
                        <div className={"mapWindow"}>
                            <MyGeoCaches/>
                        </div>
                    </Col>
                </Row>


            </Container>
        )
    }


}

export default withRouter(HomeComponent);