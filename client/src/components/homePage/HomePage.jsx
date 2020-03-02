import React, { Component, Route } from "react";
import Info from "./info/Info";
import Signup from "./signup/Signup";
import Steps from "./steps/Steps";
import Navbar from "../Navbar/Navbar";

export default class HomePage extends Component {
  state = {
    user: this.props.user
  };

  setUser = userObj => {
    this.setState({
      user: userObj
    });
  };
  render() {
    console.log(this.props.user);
    return (
      <div>
        <Info />
        <Steps />
      </div>
    );
  }
}
