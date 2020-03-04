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

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <Task
            params={this.props.match.params}
            updateAddedTasks={this.updateAddedTasks}
          />
          <Log />
        </div>
      </DragDropContext>
    );
  }
}
