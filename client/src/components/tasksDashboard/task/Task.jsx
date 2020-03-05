import React, { Component } from "react";
import axios from "axios";
import NewTask from "../newTask/NewTask";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

export default class Task extends Component {
  state = {
    showForm: false,
    tasks: []
  };
  /* componentDidMount() {
    this.getTaskData();
  } */

  // componentWillUpdate(prevProps, prevState) {
  //   if (prevState.tasks !== this.state.tasks) {
  //     console.log(prevState.tasks, this.state.tasks);
  //     this.getTaskData();
  //   }
  // }

  updateAddedTasks = task => {
    this.props.updateAddedTasks(task);

    this.setState({
      tasks: [...this.state.tasks, task],
      showForm: false
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
        <button onClick={this.showForm}>Create New Task</button>
        {this.state.showForm ? (
          <NewTask
            params={this.props.params}
            updateAddedTasks={this.updateAddedTasks}
          />
        ) : (
          ""
        )}
        <div className="tasks-container">
          <Droppable droppableId="toDoId">
            {provided => (
              <div
                className="droppable"
                id="todo"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2>To dos:</h2>
                {this.props.to_dos?.map((task, index) => {
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
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div>
            <Droppable droppableId="doingId">
              {provided => (
                <div
                  className="droppable"
                  id="doing"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2>Doing:</h2>
                  {this.props.doings?.map((task, index) => {
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
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div>
            <Droppable droppableId="doneId">
              {provided => (
                <div
                  className="droppable"
                  id="done"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2>Done:</h2>
                  {this.props.dones?.map((task, index) => {
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
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          {/* {this.state.tasks.length.map(task => {
          return <span>{task.name}</span>;
        })} */}
        </div>
      </div>
    );
  }
}
