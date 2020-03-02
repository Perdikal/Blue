import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Task from './task/Task';
import Log from './logComp/Log';

export default class TaskDashboard extends Component {
  render() {
    return (
      <div>
        <Log />
        <Route
          exact
          path="/project/:projectId"
          render={props => (
            <Task {...props} projectId={Boolean(this.state.user)} />
          )}
        />
      </div>
    );
  }
}
