import React, { Component } from "react";
import axios from "axios";
import Login from "../homePage/login/Login";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <Login history={this.props.history} setUser={this.props.setUser} />
        
      </div>
    );
  }
}
