import React from "react";
import CreateAccountComponent from "./components/CreateAccountComponent";
import MapComponent from "./components/MapComponent";
import "./App.css";


class App extends React.Component{

  render() {
    return(
        <div className={"App"}>
          <MapComponent></MapComponent>
        </div>
    );
  }
}

export default App;

