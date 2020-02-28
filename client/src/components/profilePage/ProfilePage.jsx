import React, { Component } from 'react';
import UserInfo from './userInfo/UserInfo';
import Project from './project/Project';
import ProjectButt from './projectButt/ProjectButt';

export default class ProfilePage extends Component {
  render() {
    return (
      <div>
        <UserInfo />
        <Project />
        <ProjectButt />
      </div>
    );
  }
}
