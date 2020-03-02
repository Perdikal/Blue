<<<<<<< HEAD
import React, { Component } from "react";
import UserInfo from "./userInfo/UserInfo";
import Project from "./project/Project";
import NewProjectForm from "./NewProjectForm/NewProjectForm";
=======
import React, { Component } from 'react';
import UserInfo from './userInfo/UserInfo';
import Project from './project/Project';
import ProjectButt from './projectButt/ProjectButt';
import Navbar from '../Navbar/Navbar';
>>>>>>> 852ef0a7f1ec1f049aa175974fd2c2dfa9431c1b

export default class ProfilePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <UserInfo />
        <Project />
        <NewProjectForm />
      </div>
    );
  }
}
