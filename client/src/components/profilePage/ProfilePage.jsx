import React, { Component } from "react";
import UserInfo from "./userInfo/UserInfo";
import Project from "./project/Project";
import ProjectButt from "./projectButt/ProjectButt";

export default class ProfilePage extends Component {
  render() {
    console.log("USER", this.props.user);
    return (
      <div>
        <UserInfo setUser={this.props.setUser} user={this.props.user} />
        <Project />
        <ProjectButt />
      </div>
    );
  }
}
