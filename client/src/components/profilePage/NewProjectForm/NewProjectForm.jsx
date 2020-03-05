import React, { Component } from "react";
import axios from "axios";

export default class NewProjectForm extends Component {
  state = {
    projectName: "",
    collabText: "",
    inputCollaborators: [],
    users: [],
    filteredCollaborators: [],
    collaboratorsToAdd: []
  };

  componentDidMount() {
    axios.get("/api/allMembers").then(response => {
      this.setState({
        users: response.data
      });
    });
  }

  createProject = event => {
    event.preventDefault();

    axios
      .post("/api/project/createProject", {
        name: this.state.projectName,
        members: this.state.collaboratorsToAdd
      })
      .then(response => {
        this.props.updateAddedProjects(response.data);
      });
  };

  addColaborators = e => {
    e.preventDefault();
    this.setState({
      collaboratorsToAdd: [
        ...this.state.collaboratorsToAdd,
        this.state.inputCollaborators
      ],
      collabText: "",
      inputCollaborators: ""
    });
  };

  handleNameChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCollabChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      filteredCollaborators: this.state.users.filter(elem => {
        return elem.firstName.includes(this.state.collabText);
      }),
      inputCollaborators: event.target.value
    });
  };

  /*   handleAddCollab = event => {
    event.preventDefault();
    this.state.inputCollaborators.push(this.state.collabText);
    this.setState({
      inputCollaborators: this.state.inputCollaborators,
      collabText: ''
    });
  }; */

  render() {
    return (
      <div>
        <form action="">
          <label htmlFor="projectName">Project's name:</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={this.state.projectName}
            onChange={this.handleNameChange}
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
              value={this.inputCollaborators}
            ></input>
            <datalist id="users">
              {this.state.filteredCollaborators.map(user => {
                return (
                  <option value={`${user.firstName} ${user.lastName}`}></option>
                );
              })}
            </datalist>
            {/*     <button onClick={this.handleAddCollab}>Add</button> */}
          </div>
          <div>
            {this.state.collaboratorsToAdd.map(ele => {
              return <p>{ele}</p>;
            })}
          </div>
          <button onClick={this.addColaborators}>add collaborator</button>
          <button onClick={this.createProject}> create new Project</button>
        </form>
      </div>
    );
  }
}
