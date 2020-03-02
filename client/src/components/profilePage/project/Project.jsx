import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NewProjectForm from "../NewProjectForm/NewProjectForm";

export default class Project extends Component {
  state = {
    projects: [],
    showForm: false
  };
  componentDidMount() {
    this.getProjectData();
  }

  getProjectData = () => {
    axios
      .get("/project/bringmine")
      .then(response => {
        this.setState({
          projects: response.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  showForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  createNewProject = () => {
    axios
      .post("/project/newProject")
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        {(this.state.projects.length < 3
          ? this.state.projects.slice(0)
          : this.state.projects.slice(0, 3)
        ).map(project => {
          return (
            <Link to={`/project/${project._id})`}>
              <div className="projectBox">
                <span>{project.name}</span>
              </div>
            </Link>
          );
        })}
        <button>All projects</button>
        <button onClick={this.showForm}>Create New Project</button>
        {this.state.showForm ? <NewProjectForm /> : ""}
      </div>
    );
  }
}
