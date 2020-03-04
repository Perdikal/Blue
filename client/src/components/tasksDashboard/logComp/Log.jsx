import React, { Component } from "react";
import axios from "axios";
import NewTask from "../newTask/NewTask";

export default class Log extends Component {
  state = {
    author: "",
    comment: "",
    project: "",
    allLogs: []
  };

  componentDidMount() {
    this.getAllData();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getAllData = () => {
    const id = this.props.params.id;
    axios.get(`/api/project/${id}/log`).then(response => {
      this.setState({
        author: "",
        comment: "",
        project: "",
        allLogs: response.data
      });
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const id = this.props.params.id;
    axios
      .post(`/api/project/${id}/log`, {
        author: this.state.author,
        comment: this.state.comment,
        project: this.state.project
      })
      .then(response => {
        this.getAllData();
        /* 
        axios.get(`/api/project/${id}/log`).then(response => {
          this.setState({ 
            author: "",
            comment: "",
            project: "",
            allLogs: response.data
          });
        });
       */
      });
  };

  render() {
    return (
      <div>
        <h4>Activity History:</h4>
        <div>
          {this.state.allLogs.map(element => {
            console.log(element);
            return (
              <div>
                {element.name}: {element.comment}
              </div>
            );
          })}
        </div>
        <form className="create-comment   " onSubmit={this.handleSubmit}>
          <label htmlFor="comment"> Comment</label>
          <input
            id="comment"
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange}
          ></input>
          <button>Send</button>
        </form>
      </div>
    );
  }
}
