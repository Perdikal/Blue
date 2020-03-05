import { DragDropContext } from "react-beautiful-dnd";
import React, { Component } from "react";
import Task from "./task/Task";
import Log from "./logComp/Log";
import axios from "axios";

export default class TaskDashboard extends Component {
  state = {
    to_do: [],
    doing: [],
    done: [],
    showForm: false
  };

  componentDidMount() {
    this.getTaskData();
  }

  updateState = (todos, doings, dones) => {
    this.setState({
      doing: doings,
      to_do: todos,
      done: dones
    });
  };

  getTaskData = () => {
    const todos = [];
    const doings = [];
    const dones = [];

    this.setState({
      doing: [],
      to_do: [],
      done: []
    });
    axios
      .get(`/api/project/${this.props.match.params.id}/tasks`)
      .then(response => {
        response.data.map(task => {
          switch (task.status) {
            case "doing":
              doings.push(task);
              break;
            case "to_do":
              todos.push(task);
              break;
            case "done":
              dones.push(task);
              break;
            default:
              break;
          }
        });
        this.updateState(todos, doings, dones);
      })
      .catch(err => {
        console.error(err);
      });
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    console.log(destination, source);
    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }
    if (destination.droppableId === "toDoId") {
      axios
        .post(
          `/api/project/${this.props.match.params.id}/changestatus/${draggableId}`,
          { status: "to_do" }
        )
        .then(response => {
          let { status, ticket } = response.data;
          this.setState({
            [status]: [...this.state[status], ticket],
            [ticket.status]: this.state[ticket.status].filter(ele => {
              return ele._id !== ticket._id;
            })
          });
        });
    }
    if (destination.droppableId === "doneId") {
      axios
        .post(
          `/api/project/${this.props.match.params.id}/changestatus/${draggableId}`,
          { status: "done" }
        )
        .then(response => {
          let { status, ticket } = response.data;
          this.setState({
            [status]: [...this.state[status], ticket],
            [ticket.status]: this.state[ticket.status].filter(ele => {
              return ele._id !== ticket._id;
            })
          });
          // this.getTaskData();
        });
    }
    if (destination.droppableId === "doingId") {
      axios
        .post(
          `/api/project/${this.props.match.params.id}/changestatus/${draggableId}`,
          { status: "doing" }
        )
        .then(response => {
          let { status, ticket } = response.data;
          this.setState({
            [status]: [...this.state[status], ticket],
            [ticket.status]: this.state[ticket.status].filter(ele => {
              return ele._id !== ticket._id;
            })
          });
          // this.getTaskData();
        });
    }
  };

  changeStatus = () => {};

  updateAddedTasks = task => {
    console.log(task);
    this.setState({
      to_do: [...this.state.to_do, task],
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

  editProject = () => {
    const id = this.props.match.params.id;

    axios
      .post(`/api/project/${id}/edit`)
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
          <Task
            to_dos={this.state.to_do}
            doings={this.state.doing}
            dones={this.state.done}
            params={this.props.match.params}
            updateAddedTasks={this.updateAddedTasks}
          />
          <Log params={this.props.match.params} user={this.props.user} />{" "}
          <button onClick={this.deleteProject}>Delete this project</button>
        </div>{" "}
      </div>
    );
  }
}
