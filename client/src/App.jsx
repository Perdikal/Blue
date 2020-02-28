import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import Footer from './components/footer/Footer';
import HomePage from './components/homePage/HomePage';
import ProfilePage from './components/profilePage/ProfilePage';
import TaskDashboard from './components/tasksDashboard/TaskDashboard';

class App extends React.Component {
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
      <div className="App">
        <Navbar setUser={this.setUser} user={this.state.user} />
        <h2>Blue</h2>
        <HomePage />
        <ProfilePage />
        <TaskDashboard />
        <Footer />
        {/* <info user= {}/> */}
      </div>
    );
  }
}

export default App;
