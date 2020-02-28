import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/signup/Signup";
import Info from "./components/info/Info";
import Steps from "./components/steps/Steps";
import axios from "axios";
import Task from "./components/tasks/Task";

class App extends React.Component {
  state = {
    user: this.props.user
  };
  render() {
    return (
      <div className="App">
        <Navbar />
        <h2>Blue</h2>

        <Info />
        <Steps />
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
