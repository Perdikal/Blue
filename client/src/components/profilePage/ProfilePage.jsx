import React, { Component } from 'react';
import UserInfo from './userInfo/UserInfo';
import Project from './project/Project';

export default class ProfilePage extends Component {
  render() {
    return (
      <div>
        <UserInfo setUser={this.props.setUser} user={this.props.user} />
        <Project user={this.props.user} />
      </div>
    );
  }
}
