import React, { Component } from 'react';

export default class UserInfo extends Component {
  state = {
    user: this.props.user
  };

  setUser = userObj => {
    this.setState({
      user: userObj
    });
  };

  render() {
    console.log("Aquiiiiii", this.props.user);
    return (
      <div className="information-container">
        <div className="profile-image">
          <img src={this.props.user?.image_Url} alt="User Image" />
        </div>
        <div className="text-info">
          <div className="name-display">
            <p>
              Name:
              {this.props.user?.firstName} {this.props.user?.lastName}
            </p>
          </div>
          <div className="role-display">
            <p>
              Your role:
              {this.props.user?.role}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
