import React, { Component } from "react";
import axios from "axios";

export default class NewProjectForm extends Component {
  state = {
    projectName: "",
    collabText: "",
    collaborators: [],
    users: [],
    filteredCollaborators: [],
    collabCount: 1
  };

  componentDidMount() {
    axios.get("/api/allMembers").then(response => {
      this.setState({
        users: response.data
      });
    });
  }

  createColaborators = e => {
    e.preventDefault();
    console.log("createCollab");
    /* for (let i = 0; i < this.state.collabCount; i++){
    }*/
  };

  handleNameChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCollabChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.setState({
      filteredCollaborators: this.state.users.filter(elem => {
        return elem.firstName
          .toUpperCase()
          .includes(this.state.collabText.toUpperCase());
      })
    });
    this.state.users.forEach(element => {
      console.log(element.firstName, element.lastName);
    });
  };

  render() {
    return (
      <div>
        <form action="">
          <label htmlFor="projectName">Project's name:</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            onChange={this.handleChange}
          ></input>
          <br />
          <div>
            <label htmlFor="collaborators">Project's collaborators:</label>
            <input
              list="users"
              onChange={this.handleCollabChange}
              type="text"
              id="collaborators"
              name="collabText"
            ></input>
            <datalist id="users">
              {this.state.filteredCollaborators.map(user => {
                return (
                  <option value={`${user.firstName} ${user.lastName}`}></option>
                );
              })}
            </datalist>
          </div>
          <button onClick={this.createColaborators}>
            add more collaborators
          </button>
        </form>
      </div>
    );
  }
}
