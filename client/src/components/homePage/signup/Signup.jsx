import React, { Component } from "react";
import axios from "axios";
import { Label, Form } from "./SignupStyle";
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
        console.log("here", response);
        console.log("a", this.props.history);
        this.props.history.push("/profilepage");
        this.props.setUser(response.data);
      })
      .catch(err => {
        console.log(err.message);
        this.setState({
          message: err.message
        });
      });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Label htmlFor="firstName">First Name: </Label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <Label htmlFor="lasttName">Last Name: </Label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <Label htmlFor="role">Role: </Label>
          <input
            type="text"
            id="role"
            name="role"
            value={this.state.role}
            onChange={this.handleChange}
          />
          <Label htmlFor="isManager">Are you a Manager?</Label>
          <input
            type="checkbox"
            id="isManager"
            name="isManager"
            checked={this.state.isManager}
            onChange={this.handleCheck}
          />
          <Label htmlFor="email">Email: </Label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Label htmlFor="password">Password: </Label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit">Create</button>
          {this.state.message && <p>{this.state.message}</p>}
        </Form>
        <a href={process.env.REACT_APP_SERVER_URL + "/api/auth/linkedin"}>
          Login via Linkedin
        </a>
      </div>
    );
  }
}
