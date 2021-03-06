import React, { Component, Link } from "react";
import axios from "axios";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    message: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("/api/auth/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log("LOGIN WORKED", response.data);
        this.props.setUser(response.data);

        this.props.history.push("/profilepage");
        //Redirect
      })
      .catch(err => {
        this.setState({
          message: err.response.data.message
        });
      });
  };

  render() {
    return (
      <div>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email:</label>
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
            name="password"
            id="id"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <button type="submit">Login</button>

          {this.state.message && <p>{this.state.message}</p>}
        </form>
      </div>
    );
  }
}
