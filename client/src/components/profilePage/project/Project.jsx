import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NewProjectForm from "../NewProjectForm/NewProjectForm";

export default class Project extends Component {
  state = {
    projects: [],
    showForm: false,
    showAll: false
  };
  componentDidMount() {
    this.getProjectData();
  }

  updateAddedProjects = project => {
    this.state.projects.push(project);
    this.setState({
      projects: this.state.projects,
      showForm: false
    });
  };

  getProjectData = () => {
    axios
      .get("/api/projects")
      .then(response => {
        console.log(response.data);
        this.setState({
          projects: response.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  getAll = () => {
    this.setState({
      showAll: !this.state.showAll
    });
  };

  showForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  createProject = () => {
    axios
      .post("/api/project/createProject")
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
        <button onClick={this.getAll}>All projects</button>

        <button onClick={this.showForm}>Create New Project</button>
        <h3>Your Projects:</h3>

        {this.state.showForm ? (
          <NewProjectForm updateAddedProjects={this.updateAddedProjects} />
        ) : (
          ""
        )}
        <div className="containerProjects">
          {this.state.showAll ? (
            this.state.projects.map(project => {
              return (
                <Link to={`project/${project._id}`}>
                  <div className="projectBox">
                    <div>
                      <h4>{project.name}</h4>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <>
              {this.state.projects.slice(0, 3).map(project => {
                return (
                  <Link to={`project/${project._id}`}>
                    <div className="projectBox">
                      <span>{project.name}</span>
                    </div>
                  </Link>
                );
              })}
            </>
          )}
        </div>
      </div>
    );
  }
}
