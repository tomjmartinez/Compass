import React from "react";
import CreateAccountComponent from "./components/CreateAccountComponent";
import MapComponent from "./components/MapComponent";
import "./App.css";
import MyGeoCaches from "./components/MyGeoCaches";


class App extends React.Component{

  render() {
    return(
        <div className={"App"}>
          <CreateAccountComponent></CreateAccountComponent>
          <MyGeoCaches/>
        </div>
    );
  }
}

export default App;

