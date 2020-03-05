import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Login from "../homePage/login/Login";
import Nav from "./NavbarStyle";

export default class Navbar extends Component {
  handleLogout = event => {
    event.preventDefault();
    axios.delete("/api/auth/logout").then(response => {
      this.props.setUser("");
      this.props.history.push("/");
    });
  };

  render() {
    console.log("Button");
    return (
      <Nav color={"#192c7e"}>
        {this.props.user ? (
          <button onClick={this.handleLogout}>Logout</button>
        ) : (
          <Login history={this.props.history} setUser={this.props.setUser} />
        )}
      </Nav>
    );
  }
}
