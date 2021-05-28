import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import "../styles/CreateAccountComponent.css"
import {Container, Row, Col, Form, FormGroup, Label, Input, Button, NavLink} from "reactstrap";
import axios from "axios";

// eslint-disable-next-line no-unused-vars
class CreateAccountComponent extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    handleSubmit(event) {
        event.preventDefault();

         axios.post(`http://localhost:8000/my-app/api/user`,
            {username: this.state.username, password: this.state.password}, {
                headers:{
                    'Content-Type': 'application/json'
                },
            }
        ,)
            .then(res => {
            })
        this.props.history.push("/login");
    }
    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }
    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }
    handleNextPath(path){
        this.props.history.push(path);
    }




    render() {
        return(
            <Container className={"createAccount"}>
                <Form onSubmit={this.handleSubmit}>
                    <h1>
                        <span className={"font-weight-bold"}>Compass Create Account</span>
                    </h1>
                <Row className={"accountRows"}>
                    <Col >
                        <FormGroup className={"inputs"}>
                            <Label>Username</Label>
                            <Input type={"username"} name={"username"}
                                   id={"exampleUsername"}  value={this.state.username}
                                   onChange={this.handleUsernameChange}
                                   placeholder={"username"} required>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className={"accountRows"}>
                    <Col>
                            <FormGroup className={"inputs"}>
                                <Label> Password</Label>
                                <Input type={"password"} name={"password"}
                                       id={"examplePassword"} value={this.state.password}
                                       onChange={this.handlePasswordChange}
                                       placeholder={"password"} required>
                                </Input>
                            </FormGroup>
                    </Col>
                </Row>
                <Row className={"accountRows"}>
                    <Col>
                        <Button variant="success">Submit</Button>
                    </Col>
                </Row>
                </Form>
                        <Button id={"btn-login"} onClick={()=>this.handleNextPath('/secure-login')} >Login</Button>
            </Container>
        );
    }
}

export default withRouter(CreateAccountComponent);