import React, {useState} from "react";

import "../styles/CreateAccountComponent.css"
import {Container, Row, Col, Form, FormGroup, Label, Input, Button} from "reactstrap";


// eslint-disable-next-line no-unused-vars
class CreateAccountComponent extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

    }

    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }


    render() {
        return(
            <Container className={"createAccount"}>
                <Form>
                    <h1>
                        <span className={"font-weight-bold"}>Compass</span>
                    </h1>
                <Row className={"accountRows"}>
                    <Col >
                        <FormGroup className={"inputs"}>
                            <Label>Email Address</Label>
                            <Input type={"email"} name={"email"}
                                   id={"exampleEmail"}  value={this.state.value}
                                   onChange={this.handleEmailChange}
                                   placeholder={"example@email.com"} required>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className={"accountRows"}>
                    <Col>
                            <FormGroup className={"inputs"}>
                                <Label> Password</Label>
                                <Input type={"password"} name={"password"}
                                       id={"examplePassword"} value={this.state.value}
                                       placeholder={"password"} required>
                                </Input>
                            </FormGroup>
                    </Col>
                </Row>
                <Row className={"accountRows"}>
                    <Col>
                        <Button type={"submit"} color={"primary"} id={"btnCreateAccount"}>Create Account</Button>
                    </Col>
                </Row>
                </Form>
            </Container>
        );
    }
}

export default CreateAccountComponent;