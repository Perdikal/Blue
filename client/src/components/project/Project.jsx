import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class PostDetail extends Component {
  state = {
    projects: []
  };
  componentDidMount() {
    this.getProjectData();
  }

  getProjectData = () => {
    axios.get("/project/bringmine").then(response => {
      this.setState({
        projects: response.data
      });
    });
  };
  render() {
    return (
      <div>
        {(this.state.projects.length < 3
          ? this.state.project.slice(0)
          : this.state.project.slice(0, 3)
        ).map(project => {
          return (
            <Link to={`/project   TOfixLater)`}>
              <div className="projectBox">
                <span>{project.name}</span>
              </div>
            </Link>
          );
        })}
        <button>All projects</button>
      </div>
    );
  }
}
