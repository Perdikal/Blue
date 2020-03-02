import React, { Component } from "react";
import axios from "axios";

export default class NewProjectForm extends Component {
  state = {
    projectName: "",
    collaborators: []
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

    axios.get("/newProjectMembers").then(response => {
      console.log(response);
      //here we will show the list of names matching the query});
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
          <label htmlFor="collaborators">Project's collaborators:</label>
          <input
            onChange={this.handleCollabChange}
            type="text"
            id="collaborators"
            name="collaborators"
          ></input>
        </form>
      </div>
    );
  }
}
