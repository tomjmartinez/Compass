import React from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {withRouter} from "react-router-dom";
import "../styles/LoginComponent.css";
import axios from "axios";

class SecureLogin  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleInvalidLogin(){
        this.state.error = "Invalid Login";
    }

    handleSubmit(event){
        event.preventDefault();

        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        localStorage.setItem("currentUser", "");
        localStorage.setItem("seeking", "")

        const addStorage = (username, password, id) => {
            localStorage.setItem("username",username);
            localStorage.setItem("password",password);
            localStorage.setItem("currentUser",id);

        }

        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        };

        axios.post(`http://localhost:8000/my-app/api/secure-login`,
            {
                username: this.state.username,
                password: this.state.password
            }, config)
            .then(res => {
                addStorage(res.data.user.username, res.data.user.password, res.data.userID)
                this.handleInvalidLogin();
                if(this.state.error != "error") {
                    this.handleNextPath("/home")
                }
            })
            .catch();
    }
    handleNextPath(path){
        this.props.history.push(path);
    }
    handleUsernameChange(event){
        this.setState({username: event.target.value});
        console.log(this.state.username);
    }
    handlePasswordChange(event){
        this.setState({password: event.target.value});
        console.log(event.target.value);
    }

    // eslint-disable-next-line react/require-render-return
    render() {
        return(
            <Container className={"login"}>
                <Form onSubmit={this.handleSubmit}>
                    <h1>
                        <span className={"font-weight-bold"}>Compass Login</span>
                    </h1>
                    <Row className={"accountRows"}>
                        <Col >
                            <FormGroup className={"inputs"} autoComplete={"on"}>
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
                            <Button variant="success" >Submit</Button>
                        </Col>
                    </Row>
                </Form>
                <Button id={"btn-login"} onClick={()=>this.handleNextPath('/')} >Create Account</Button>
            </Container>
        );
    }

}
export default SecureLogin;