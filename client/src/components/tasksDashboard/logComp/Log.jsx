/* import React, { Component } from "react";
import axios from "axios";
import NewTask from "../newTask/NewTask";

export default class Log extends Component {
  state = {
    author: "",
    comment: "",
    log: []
  };

  componentDidMount() {
    this.getLogData();
  }

  getLogData = () => {
    axios
      .get(`/api/project/${id}/log`)
      .then(response => {
        this.setState({
          projects: response.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <h4>Activity History:</h4>
      </div>
    );
  }
}
 */
