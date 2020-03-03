import React, { Component } from "react";
import { Route } from "react-router-dom";
import Task from "./task/Task";
import Log from "./logComp/Log";

export default class TaskDashboard extends Component {
  state = {
    tasks: [],
    showForm: false
  };
  // componentDidMount() {
  //   this.getProjectData();
  // }

  updateAddedTasks = task => {
    console.log('Does this even work');
    this.state.tasks.push(task);
    this.setState({
      tasks: this.state.tasks,
      showForm: false
    });
  };

  render() {
    console.log(this.props.match.params.id);
    return (
      <div>
        <Log />
        <Task params={this.props.match.params} updateAddedTasks={this.updateAddedTasks} />
        {/* <Route
          exact
          path="/project/:id"
          render={props => (
            <Task {...props} id={Boolean(this.state.user)} />
          )}
        /> */}
      </div>
    );
  }
}
