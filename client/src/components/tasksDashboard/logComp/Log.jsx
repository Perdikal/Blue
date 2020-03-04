import React, { Component } from "react";
import axios from "axios";
import NewTask from "../newTask/NewTask";

export default class Log extends Component {
  state = {
    author: "",
    comment: "",
<<<<<<< HEAD
    status: "",
    logs: []
  };

  componentDidMount() {
    this.getComments();
  }
  getComments = () => {
    axios
      .get("/project/:id/log")
      .then(response => {
        this.setState({
          comment: response.data
        });
        console.log(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  };
=======
    project: "",
    allLogs: []
  };

  componentDidMount() {
    this.getAllData();
  }
>>>>>>> 09d2eb5cc90871848f3f50207b206dbe9e990810

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

<<<<<<< HEAD
  /* handleSubmit = comment => {
    comment.preventDefault();

    axios.post("/project/:id/log"),
      {
        author: this.state.author,
        comment: this.state.comment,
        project: this.props.params.id
      };
  }; */

  updateAddedComment = log => {
    this.state.log.push(log);
    this.setState({
      log: this.state.log
    });
=======
  getAllData = () => {
    const id = this.props.params.id;
    axios.get(`/api/project/${id}/log`).then(response => {
      this.setState({
        author: "",
        comment: "",
        project: "",
        allLogs: response.data
      });
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const id = this.props.params.id;
    axios
      .post(`/api/project/${id}/log`, {
        author: this.state.author,
        comment: this.state.comment,
        project: this.state.project
      })
      .then(response => {
        this.getAllData();
        /* 
        axios.get(`/api/project/${id}/log`).then(response => {
          this.setState({ 
            author: "",
            comment: "",
            project: "",
            allLogs: response.data
          });
        });
       */
      });
>>>>>>> 09d2eb5cc90871848f3f50207b206dbe9e990810
  };

  render() {
    return (
      <div>
        <h4>Activity History:</h4>
<<<<<<< HEAD
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
=======
        <div>
          {this.state.allLogs.map(element => {
            console.log(element);
            return (
              <div>
                {element.name}: {element.comment}
              </div>
            );
          })}
        </div>
        <form className="create-comment   " onSubmit={this.handleSubmit}>
          <label htmlFor="comment"> Comment</label>
          <input
>>>>>>> 09d2eb5cc90871848f3f50207b206dbe9e990810
            id="comment"
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange}
<<<<<<< HEAD
          />
          <button type="submit">Send</button>
=======
          ></input>
          <button>Send</button>
>>>>>>> 09d2eb5cc90871848f3f50207b206dbe9e990810
        </form>
      </div>
    );
  }
}
