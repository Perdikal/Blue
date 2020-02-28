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
    <div>
      {this.state.project.slice(0, 3).map(project => {
        return (
          <Link to="/project">
            <div className="projectBox">
              <span>{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>;
  }
}
