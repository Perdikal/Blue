import React, { Component } from 'react';
import Info from './info/Info';
import Login from './login/Login';
import Signup from './signup/Signup';
import Steps from './steps/Steps';

export default class HomePage extends Component {
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
      <div>
        <Login />
        <Signup setUser={this.setUser} user={this.state.user} />
        <Info />
        <Steps />
      </div>
    );
  }
}
