import React, { Component } from "react";
import Task from "./task/Task";
import Log from "./logComp/Log";

export default class TaskDashboard extends Component {
  state = {
    tasks: [],
    showForm: false
  };

  updateAddedTasks = task => {
    this.state.tasks.push(task);
    this.setState({
      tasks: this.state.tasks,
      showForm: false
    });
  };

  render() {
    return (
      <div>
        <Task
          params={this.props.match.params}
          updateAddedTasks={this.updateAddedTasks}
        />
        <Log />
      </div>
    );
  }
}
