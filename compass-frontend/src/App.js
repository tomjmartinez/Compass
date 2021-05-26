import React from "react";
import CreateAccountComponent from "./components/CreateAccountComponent";
import LoginComponent from "./components/LoginComponent";
import HomeComponent from "./components/HomeComponent";
import "./App.css";
import MyGeoCaches from "./components/MyGeoCaches";
import AllGeoCaches from "./components/AllGeoCaches";
import AvailGeoCaches from "./components/AvailGeoCaches";
import SecureLogin from "./components/SecureLogin";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CreateGeoCacheComponent from "./components/CreateGeoCacheComponent";


class App extends React.Component{

  render() {
    return(
        <div className={"App"}>
        <Router>
            <Switch>
                <Route path={"/"} exact component={CreateAccountComponent}/>
                <Route path={"/login"} component={LoginComponent}/>
                <Route path={"/my-geocaches"} component={MyGeoCaches}/>
                <Route path={"/all-geocaches"} component={AllGeoCaches}/>
                <Route path={"/avail-geocaches"} component={AvailGeoCaches}/>
                <Route path={"/secure-login"} component={SecureLogin}/>
                <Route path={"/home"} component={HomeComponent}/>
                <Route path={"/create-geocaches"} component={CreateGeoCacheComponent}/>
            </Switch>
        </Router>
        </div>

    );
  }
}

export default App;

