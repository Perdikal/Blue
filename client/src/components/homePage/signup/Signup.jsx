import React, { Component } from "react";
import axios from "axios";

export default class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    role: "",
    isManager: false,
    email: "",
    password: "",
    message: ""
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCheck = event => {
    this.setState({
      isManager: event.target.checked
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("/api/auth/signup", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        role: this.state.role,
        isManager: this.state.isManager,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        this.props.history.push("/profile");
        this.props.setUser(response.data);
      })
      .catch(err => {
        this.setState({
          message: err.response?.data.message
        });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <label htmlFor="lasttName">Last Name: </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <label htmlFor="role">Role: </label>
          <input
            type="text"
            id="role"
            name="role"
            value={this.state.role}
            onChange={this.handleChange}
          />
          <label htmlFor="isManager">Are you a Manager?</label>
          <input
            type="checkbox"
            id="isManager"
            name="isManager"
            checked={this.state.isManager}
            onChange={this.handleCheck}
          />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit">Create</button>
          {this.state.message && <p>{this.state.message}</p>}
        </form>
      </div>
    );
  }
}
