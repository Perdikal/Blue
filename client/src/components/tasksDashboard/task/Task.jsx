import React, { Component } from "react";
import axios from "axios";
import NewTask from "../newTask/NewTask";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

export default class Task extends Component {
  state = {
    tasks: [],
    showForm: false
  };
  componentDidMount() {
    this.getTaskData();
  }

  // componentWillUpdate(prevProps, prevState) {
  //   if (prevState.tasks !== this.state.tasks) {
  //     console.log(prevState.tasks, this.state.tasks);
  //     this.getTaskData();
  //   }
  // }

  updateAddedTasks = task => {
    this.state.tasks.push(task);
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
          tasks: response.data //push?
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  /* Task() {
    return <h1> </h1>;
  } */
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
        <Droppable droppableId="toDoId">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <h2>To dos:</h2>
              {this.state.tasks.map((task, index) => {
                if (task.status === "to-do") {
                  return (
                    <Draggable index={index} draggableId={String(task._id)}>
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div id="{task._id}">{task.title}</div>
                        </div>
                      )}
                    </Draggable>
                  );
                }
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div>
          <Droppable droppableId="doingId">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h2>Doing:</h2>
                {this.state.tasks.map((task, index) => {
                  if (task.status === "doing") {
                    return (
                      <Draggable index={index} draggableId={String(task._id)}>
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div id="{task._id}">{task.title}</div>
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div>
          <Droppable droppableId="doneId">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h2>Done:</h2>
                {this.state.tasks.map((task, index) => {
                  if (task.status === "done") {
                    return (
                      <Draggable index={index} draggableId={String(task._id)}>
                        {provided => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div id="{task._id}">{task.title}</div>
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
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
