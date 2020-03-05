import { DragDropContext } from "react-beautiful-dnd";
import React, { Component } from "react";
import Task from "./task/Task";
import Log from "./logComp/Log";
import axios from "axios";

export default class TaskDashboard extends Component {
  state = {
    tasks: [],
    showForm: false
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      console.log(draggableId);
      return;
    }
    if (destination.droppableId === "toDoId") {
      axios.post(
        `/api/project/${this.props.match.params.id}/changestatus/${draggableId}`,
        { status: "to-do" }
      );
    }
    if (destination.droppableId === "doneId") {
      axios.post(
        `/api/project/${this.props.match.params.id}/changestatus/${draggableId}`,
        { status: "done" }
      );
    }
    if (destination.droppableId === "doingId") {
      axios.post(
        `/api/project/${this.props.match.params.id}/changestatus/${draggableId}`,
        { status: "doing" }
      );
    }
  };

  changeStatus = () => {};

  updateAddedTasks = task => {
    this.setState({
      tasks: this.state.tasks,
      showForm: false
    });
  };
  // this.state.tasks.push(task);

  deleteProject = () => {
    console.log("whateverdeleteteeeeee", this.props.user.projects);
    const id = this.props.match.params.id;

    axios
      .post(`/api/project/${id}/delete`)
      .then(response => {
        console.log(response);
        console.log(this.props.history);
        this.props.history.push("/profilepage");
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    console.log(this.props.match.params.id);

    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div>
            <Task
              params={this.props.match.params}
              updateAddedTasks={this.updateAddedTasks}
            />
            <Log params={this.props.match.params} user={this.props.user} />
          </div>
        </DragDropContext>
        <div>
          {" "}
          <button onClick={this.deleteProject}>Delete this project</button>
        </div>{" "}
      </div>
    );
  }
}
