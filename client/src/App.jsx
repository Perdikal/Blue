import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.js";
import Posts from "./components/Posts.js";
import PostDetail from "./components/PostDetail.js";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";

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
