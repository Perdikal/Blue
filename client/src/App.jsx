import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/signup/Signup';
import Info from './components/info/Info';
import Step from './components/steps/Step';

class App extends React.Component {
  state = {
    user: this.props.user
  };
  render() {
    return (
      <div className="App">
        {this.props}
        <Navbar />

        {/* <info user= {}/> */}
      </div>
    );
  }
}

export default App;
