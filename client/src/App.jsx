import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/Footer';
import HomePage from './components/homePage/HomePage';
import ProfilePage from './components/profilePage/ProfilePage';
import TaskDashboard from './components/tasksDashboard/TaskDashboard';

import Signup from './components/homePage/signup/Signup';
import Steps from './components/homePage/steps/Steps';
import Info from './components/homePage/info/Info';

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
        <Route
          render={props => (
            <Navbar
              history={props.history}
              //{...props}
              setUser={this.setUser}
              user={this.state.user}
            />
          )}
        />
        <h2>Blue</h2>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/profilepage"
          render={props => <ProfilePage {...props} user={this.state.user} />}
        />
        <TaskDashboard /> {/* NEED A ROUTE */}
        <Footer />
      </div>
    );
  }
}

export default App;
