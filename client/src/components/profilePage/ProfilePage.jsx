import React, { Component } from 'react';
import UserInfo from './userInfo/UserInfo';
import Project from './project/Project';
import ProjectButt from './projectButt/ProjectButt';
import Navbar from '../Navbar/Navbar';

export default class ProfilePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <UserInfo />
        <Project />
        <ProjectButt />
      </div>
    );
  }
}
