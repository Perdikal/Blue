import React, { Component } from 'react';
import axios from 'axios';
import NewTask from '../newTask/NewTask';

export default class Task extends Component {
  state = {
    tasks: [],
    showForm: false
  };
  componentDidMount() {
    this.getTaskData();
  }

  updateAddedTasks = task => {
    console.log('show me the tasks');
    this.state.tasks.push(task);
    this.setState({
      tasks: this.state.tasks,
      showForm: false
    });
  };

  getTaskData = () => {
    axios
      .get(`/project/${this.props.params.id}/tasks`)
      .then(response => {
        this.setState({
          tasks: response.data
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

  createTask = () => {
    axios
      .post(`/project/${this.props.params.id}/createTask`)
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
        {/* {this.state.tasks.length.map(task => {
          return <span>{task.name}</span>;
        })} */}

        <button onClick={this.showForm}>Create New Task</button>
        {this.state.showForm ? (
          <NewTask
            params={this.props.params}
            updateAddedTasks={this.updateAddedTasks}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}
