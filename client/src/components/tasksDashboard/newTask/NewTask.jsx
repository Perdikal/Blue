// import React, { Component } from 'react';
// import axios from 'axios';

// export default class NewTask extends Component {
//   state = {
//     title: '',
//     description: '',
//     assignee: [],
//     status: '',
//     author: []
//   };

//   handleChange = event => {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     console.log('Form submitted');
//     const id = this.props.match.params.project._id;
//     axios
//       .post(`/api/auth/project/${id}/createtask`, {
//         title: this.state.title,
//         description: this.state.description,
//         assignee: this.state.assignee,
//         status: this.state.status,
//         author: this.state.author
//       })
//       .then(() => {
//         console.log('Response received, calling getData in <Task/>');
//         // this.props.refresh();
//         this.setState({
//           title: '',
//           description: '',
//           assignee: '',
//           status: '',
//           author: ''
//         });
//       });
//   };

//   render() {
//     return (
//       <form className="create-task" onSubmit={this.handleSubmit}>
//         <label htmlFor="title">Title</label>
//         <input
//           id="title"
//           name="title"
//           type="text"
//           value={this.state.title}
//           onChange={this.handleChange}
//         />

//         <label htmlFor="content">Description</label>
//         <input
//           id="description"
//           name="description"
//           type="text"
//           value={this.state.assignee}
//           onChange={this.handleChange}
//         />

//         <label htmlFor="content">Assigned to</label>
//         <input
//           id="asseignee"
//           name="asseignee"
//           type="text"
//           value={this.state.assignee}
//           onChange={this.handleChange}
//         />

//         <label htmlFor="content">Status</label>
//         <input
//           id="status"
//           name="status"
//           type="text"
//           value={this.state.assignee}
//           onChange={this.handleChange}
//         />
//       </form>
//     );
//   }
// }

// import React, { Component } from 'react';
// import axios from 'axios';

import React, { Component } from 'react';
import axios from 'axios';

export default class NewTask extends Component {
  state = {
    title: '',
    description: '',
    status: '',
    author: '',
    assigneeText: '',
    inputAssignees: [],
    users: [],
    filteredAssignees: [],
    assigneesToAdd: []
  };

  componentDidMount() {
    axios.get('/api/allMembers').then(response => {
      this.setState({
        users: response.data
      });
    });
  }

  createTask = event => {
    event.preventDefault();

    let paramsId = this.props.params.id;
    console.log('Markus', paramsId);

    axios
      .post(`/api/project/${paramsId}/createTask`, {
        title: this.state.title,
        users: this.state.assignees,
        description: this.state.description,
        author: this.state.author
      })
      .then(response => {
        console.log(response.data);
        this.props.updateAddedTasks(response.data);
      });
  };

  addAssignees = e => {
    e.preventDefault();
    console.log(
      'addCola',
      this.state.inputAssignees,
      this.state.assigneesToAdd
    );
    this.setState({
      assigneesToAdd: [...this.state.assigneesToAdd, this.state.inputAssignees],
      assigneeText: '',
      inputAssignees: ''
    });
  };

  handleNameChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleAssigneeChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      filteredAssignees: this.state.users.filter(elem => {
        return elem.firstName.includes(this.state.assigneeText);
      }),
      inputAssignees: event.target.value
    });
  };

  render() {
    console.log('HIUHIUHUI', this.props.params.id);
    return (
      <div>
        <form action="">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleNameChange}
          ></input>
          <br />
          <label htmlFor="content">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={this.state.assignee}
            onChange={this.handleChange}
          />

          <div>
            <label htmlFor="collaborators">Assigned To: </label>
            <input
              list="users"
              onChange={this.handleAssigneeChange}
              type="text"
              id="assignees"
              name="assigneeText"
              value={this.inputAssignees}
            ></input>
            <datalist id="users">
              {this.state.filteredAssignees.map(user => {
                return (
                  <option value={`${user.firstName} ${user.lastName}`}></option>
                );
              })}
            </datalist>
          </div>
          <div>
            {this.state.assigneesToAdd.map(member => {
              return <p>{member}</p>;
            })}
          </div>
          <button onClick={this.createTask}> Create Task</button>
        </form>
      </div>
    );
  }
}
