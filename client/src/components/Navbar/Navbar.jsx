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

  goToProfile = () => {
    this.props.history.push("/profilepage");
  };

  render() {
    return (
      <Nav color={"#192c7e"}>
        <div></div>
        <div>
          {this.props.user ? (
            <>
              <button onClick={this.handleLogout}>Logout</button>
              <button onClick={this.goToProfile}>Profile</button>
            </>
          ) : (
            <Login history={this.props.history} setUser={this.props.setUser} />
          )}
        </div>
      </Nav>
    );
  }
}
