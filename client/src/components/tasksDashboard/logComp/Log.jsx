import React, { Component } from "react";
import axios from "axios";
import NewTask from "../newTask/NewTask";

export default class Log extends Component {
  state = {
    author: "",
    comment: "",
    status: ""
  };

  render() {
    return (
      <div>
        <h4>Activity History:</h4>
      </div>
    );
  }
}
