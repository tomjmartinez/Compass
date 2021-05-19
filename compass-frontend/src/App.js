import React from "react";
import CreateAccountComponent from "./components/CreateAccountComponent";
import "./App.css";


class App extends React.Component{

  render() {
    return(
        <div className={"App"}>
          <CreateAccountComponent></CreateAccountComponent>
        </div>
    );
  }
}

export default App;

