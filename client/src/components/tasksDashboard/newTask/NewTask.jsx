import React, { Component } from "react";
import axios from "axios";

export default class NewTask extends Component {
  state = {
    title: "",
    description: "",
    status: "",
    author: "",
    assigneeText: "",
    inputAssignees: [],
    users: [],
    filteredAssignees: [],
    assigneesToAdd: []
  };

  componentDidMount() {
    axios.get("/api/allMembers").then(response => {
      this.setState({
        users: response.data
      });
    });
  }

  createTask = event => {
    event.preventDefault();

    let paramsId = this.props.params.id;

    axios
      .post(`/api/project/${paramsId}/createTask`, {
        title: this.state.title,
        assignee: this.state.inputAssignees,
        description: this.state.description,
        author: this.state.author
      })
      .then(response => {
        this.props.updateAddedTasks(response.data);
      });
  };

  addAssignees = e => {
    e.preventDefault();
    this.setState({
      assigneesToAdd: [...this.state.assigneesToAdd, this.state.inputAssignees],
      assigneeText: "",
      inputAssignees: ""
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleAssigneeChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      filteredAssignees: this.state.users.filter(elem => {
        return elem.firstName.includes(this.state.assigneeText);
      }),
      inputAssignees: event.target.value
    });
  };

  render() {
    return (
      <div>
        <form action="">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          ></input>
          <br />
          <label htmlFor="content">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={this.state.assignee}
            onChange={this.handleChange}
          />

          <div>
            <label htmlFor="collaborators">Assigned To: </label>
            <input
              list="users"
              onChange={this.handleAssigneeChange}
              type="text"
              id="assignees"
              name="assigneeText"
              value={this.inputAssignees}
            ></input>
            <datalist id="users">
              {this.state.filteredAssignees.map(user => {
                return (
                  <option value={`${user.firstName} ${user.lastName}`}></option>
                );
              })}
            </datalist>
          </div>
          <div>
            {this.state.assigneesToAdd.map(member => {
              return <p>{member}</p>;
            })}
          </div>
          <button onClick={this.createTask}>Create Task</button>
        </form>
      </div>
    );
  }
}
