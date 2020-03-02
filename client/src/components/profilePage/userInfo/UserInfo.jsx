import React, { Component } from "react";

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
    return (
      <div className="information-container">
        <img src={this.props.user?.image_Url} alt="User Image" />
        <div className="text-info">
          <div className="name-display">
            {this.props.user?.firstname} {this.props.user?.lastname}
          </div>
          <div className="role-display">{this.props.user?.role}</div>
        </div>
      </div>
    );
  }
}
