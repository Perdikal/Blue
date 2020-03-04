import React, { Component } from "react";
import axios from "axios";
import NewTask from "../newTask/NewTask";

export default class Task extends Component {
  state = {
    tasks: [],
    showForm: false
  };
  componentDidMount() {
    this.getTaskData();
  }

  updateAddedTasks = task => {
    //console.log("show me the tasks");
    //this.state.tasks.push(task);
    this.setState({
      tasks: [...this.state.tasks, task],
      showForm: false
    });
  };

  getTaskData = () => {
    axios
      .get(`/api/project/${this.props.params.id}/tasks`)
      .then(response => {
        this.setState({
          tasks: [...response.data]
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
        this.setState({ tasks: [...this.state.tasks, response.data] });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        <div>
          <h2>To dos:</h2>
          {this.state.tasks.map(task => {
            if (task.status === "to-do") {
              //console.log("true");
              return <div draggable="true">{task.title}</div>;
            }
          })}
        </div>
        <div>
          <h2>Doing:</h2>
        </div>
        <div>
          <h2>Done:</h2>
        </div>
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
          ""
        )}
      </div>
    );
  }
}
