import React from "react";
import CreateAccountComponent from "./components/CreateAccountComponent";
import MapComponent from "./components/MapComponent";
import LoginComponent from "./components/LoginComponent";
import "./App.css";
import MyGeoCaches from "./components/MyGeoCaches";
import CreateGeoCacheComponent from "./components/CreateGeoCacheComponent";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


class App extends React.Component{

  render() {
    return(
        <div className={"App"}>
        <Router>
            <Switch>
                <Route path={"/"} exact component={CreateAccountComponent}/>
                <Route path={"/login"} component={LoginComponent}/>
                <Route path={"/my-geocaches"} component={MyGeoCaches}/>
            </Switch>
        </Router>
        </div>

    );
  }
}

export default App;

