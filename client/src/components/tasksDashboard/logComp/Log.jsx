import React, { Component } from "react";
import axios from "axios";
import NewTask from "../newTask/NewTask";

export default class Log extends Component {
  state = {
    author: "",
    comment: "",
    status: "",
    logs: []
  };

  componentDidMount() {
    this.getComments();
  }
  getComments = () => {
    axios
      .get("/project/:id/log")
      .then(response => {
        this.setState({
          comment: response.data
        });
        console.log(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = comment => {
    comment.preventDefault();

    axios.post("/project/:id/log"),
      {
        author: this.state.author,
        comment: this.state.comment,
        project: projectId
      };
  };

  updateAddedComment = log => {
    this.state.log.push(log);
    this.setState({
      log: this.state.log
    });
  };

  render() {
    return (
      <div>
        <h4>Activity History:</h4>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}
