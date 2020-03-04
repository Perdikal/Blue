import React, { Component } from "react";
import UserInfo from "./userInfo/UserInfo";
import Project from "./project/Project";
import NewProjectForm from "./NewProjectForm/NewProjectForm";
//import Navbar from "../Navbar/Navbar";

export default class ProfilePage extends Component {
  render() {
<<<<<<< HEAD
    console.log("USER", this.props.user);
    console.log("Project", this.props.user.projects);
=======
>>>>>>> e717c893371da78a3763ee9454eb9056c95df067
    return (
      <div>
        <UserInfo setUser={this.props.setUser} user={this.props.user} />
        <Project user={this.props.user} />
      </div>
    );
  }
}
