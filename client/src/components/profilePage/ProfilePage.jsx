import React, { Component } from "react";
import UserInfo from "./userInfo/UserInfo";
import Project from "./project/Project";
import NewProjectForm from "./NewProjectForm/NewProjectForm";

export default class ProfilePage extends Component {
  render() {
    return (
      <div>
        <UserInfo />
        <Project />
        <NewProjectForm />
      </div>
    );
  }
}
