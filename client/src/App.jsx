import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/signup/Signup";
import Info from "./components/info/Info";
import Steps from "./components/steps/Steps";
import axios from "axios";
import Footer from "./components/footer/Footer";
import Task from "./components/tasks/Task";

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
        <Signup setUser={this.setUser} user={this.state.user} />

        <Info />
        <Steps />
        <Footer />
        {/* <info user= {}/> */}
        <Route
          exact
          path="/project/:projectId"
          render={props => (
            <Task {...props} projectId={Boolean(this.state.user)} />
          )}
        />
      </div>
    );
  }
}

export default App;
