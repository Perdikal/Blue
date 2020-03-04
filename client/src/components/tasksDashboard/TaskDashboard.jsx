import React, { Component } from "react";
import Task from "./task/Task";
import Log from "./logComp/Log";

export default class TaskDashboard extends Component {
  state = {
    tasks: [],
    showForm: false
  };

  updateAddedTasks = task => {
    console.log("Does this even work");
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
        <Task
          params={this.props.match.params}
          updateAddedTasks={this.updateAddedTasks}
        />
      </div>
    );
  }
}
