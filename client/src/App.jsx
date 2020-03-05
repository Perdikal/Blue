import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";
import HomePage from "./components/homePage/HomePage";
import ProfilePage from "./components/profilePage/ProfilePage";
import TaskDashboard from "./components/tasksDashboard/TaskDashboard";
import Project from "./components/profilePage/project/Project";

class App extends React.Component {
  state = {
    user: this.props.user
    // projects: this.props.project
  };

  setUser = userObj => {
    this.setState({
      user: userObj
    });
  };

  deleteUserState() {
    this.setState({
      user: ""
    });
  }
  render() {
    return (
      <div className="App">
        <Route
          render={props => (
            <Navbar
              color={"#192c7e"}
              history={props.history}
              //{...props}
              setUser={this.setUser}
              user={this.state.user}
              deleteUserState={this.deleteUserState}
            />
          )}
        />
        {/* <Route
          exact
          path="/"
          render={props => (
            <Signup
              history={props.history}
              //{...props}
              setUser={this.setUser}
              user={this.state.user}
            />
          )}
        /> */}

        {this.state.user ? (
          <Route exact path="/" component={ProfilePage} />
        ) : (
          <Route exact path="/" component={HomePage} />
        )}
        <Route
          exact
          path="/profilepage"
          render={props => <ProfilePage {...props} user={this.state.user} />}
        />
        <Route
          exact
          path="/project/:id"
          render={props => <TaskDashboard {...props} user={this.state.user} />}
        />
        <Route
          exact
          path="/projects"
          render={props => <Project {...props} user={this.state.user} />}
        />

        <Footer />
      </div>
    );
  }
}

export default App;
