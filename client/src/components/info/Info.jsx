import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  render() {
    return (
      <div className="information-container">
        <img src={this.props.user.image_Url} alt="User Image" />
        <div className="text-info">
          <div className="name-display">
            {this.props.user.firstname} {this.props.user.lastname}
          </div>
          <div className="role-display">{this.props.user.role}</div>
        </div>
      </div>
    );
  }
}
