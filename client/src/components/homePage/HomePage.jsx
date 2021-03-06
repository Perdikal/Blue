import React, { Component, Route } from 'react';
import Info from './info/Info';
import Signup from './signup/Signup';
import Steps from './steps/Steps';
import Navbar from '../Navbar/Navbar';

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
        <div className="blue2">
          <h1>Blue</h1>
          <Signup setUser={this.props.setUser} history={this.props.history} />
        </div>

        <Info />

        <Steps />
      </div>
    );
  }
}
