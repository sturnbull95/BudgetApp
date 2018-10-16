import React, { Component} from "react";
import "./App.css";
import {hot} from "react-hot-loader";
import Payments from "./Payments.js"

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Hello! </h1>
        <Payments />
      </div>
    );
  }
}

export default hot(module)(App);
