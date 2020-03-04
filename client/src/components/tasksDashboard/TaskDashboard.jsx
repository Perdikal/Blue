import React, { Component } from 'react';
import Task from './task/Task';
import Log from './logComp/Log';
import axios from 'axios';

export default class TaskDashboard extends Component {
  state = {
    tasks: [],
    showForm: false
  };

  updateAddedTasks = task => {
    console.log('Does this even work');
    this.state.tasks.push(task);
    this.setState({
      tasks: this.state.tasks,
      showForm: false
    });
  };

  deleteProject = () => {
    console.log('whateverdeleteteeeeee', this.props.user.projects);
    const id = this.props.match.params.id;

    axios
      .post(`/api/project/${id}/delete`)
      .then(response => {
        console.log(response);
        console.log(this.props.history);
        this.props.history.push('/profilepage');
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    console.log(this.props.match.params.id);

    return (
      <div>
        <Log params={this.props.match.params} />
        <Task
          params={this.props.match.params}
          updateAddedTasks={this.updateAddedTasks}
        />
        <div>
          <button onClick={this.deleteProject}>Delete this project</button>
        </div>
      </div>
    );
  }
}
