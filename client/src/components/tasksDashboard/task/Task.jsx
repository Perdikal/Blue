import React, { Component } from 'react';
import axios from 'axios';

export default class Task extends Component {
  state = {};

  componentDidMount() {
    this.getTaskData();
  }

  getTaskData = () => {
    axios.get(`/project/${this.props.match.params.id}/tasks`).then(response => {
      
    })
  };

  render() {
    return <div></div>;
  }
}
