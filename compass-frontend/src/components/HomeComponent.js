import React from "react";
import {Button, Col, Container, Row} from "reactstrap";
import "../styles/HomeComponent.css";
import {withRouter} from "react-router-dom";
import MapComponent from "./MapComponent";
import MyGeoCaches from "./MyGeoCaches";
import GeoCachesTable from "./GeoCachesTable";

class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangePath = this.handleChangePath.bind(this);
    }
    handleChangePath(path){
        this.props.history.push(path);
    }


    render() {
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
                    <Button className={"btn-view-caches"} onClick={()=>this.handleChangePath('/avail-geocaches')}> View Caches</Button>
                </Row>
                <Row>
                    <Button className={"btn-add-caches"} onClick={()=>this.handleChangePath('/create-geocaches')}>
                        Add Cache
                    </Button>
                </Row>
                <Row>
                    <Button className={"btn-near-caches"} onClick={()=>this.handleChangePath('/near-geocaches')}> View Near Caches</Button>
                </Row>
                <Row>
                    <Col>
                        <div className={"mapWindow"}>
                            <MapComponent/>
                        </div>
                    </Col>
                </Row>


            </Container>
        )
    }


}

export default withRouter(HomeComponent);