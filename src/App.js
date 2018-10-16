import React, { Component} from "react";
import "./App.css";
import {hot} from "react-hot-loader";
import Payments from "./Payments.js"

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      total: this.props.total
    }
  }
  render(){
    return(
      <div className="App">
        <h1> Hello! </h1>
        <Payments total={this.state.total}/>
      </div>
    );
  }
}

export default hot(module)(App);
