import React, { Component } from 'react';
import axios from 'axios';

export default class NewTask extends Component {
  state = {
    title: '',
    description: '',
    assignee: '',
    status: '',
    author: ''
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    console.log('Form submitted');
    const id = this.props.match.params.project._id;
    axios
      .post(`/api/auth/project/${id}/createtask`, {
        title: this.state.title,
        description: this.state.description,
        assignee: this.state.assignee,
        status: this.state.status,
        author: this.state.author
      })
      .then(() => {
        console.log('Response received, calling getData in <Task/>');
        // this.props.refresh();
        this.setState({
          title: '',
          description: '',
          assignee: '',
          status: '',
          author: ''
        });
      });
  };

  render() {
    return (
      <form className="create-task" onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />

        <label htmlFor="content">Description</label>
        <input
          id="description"
          name="description"
          value={this.state.assignee}
          onChange={this.handleChange}
        />

        <label htmlFor="content">Assigned to</label>
        <input
          id="asseignee"
          name="asseignee"
          value={this.state.assignee}
          onChange={this.handleChange}
        />

        <label htmlFor="content">Status</label>
        <input
          id="status"
          name="status"
          value={this.state.assignee}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
