import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      available_tests: []
    };
  }

  componentDidMount() {
    axios.get("/api/tests/list_tests").then(res => {
      this.setState({ available_tests: res.data.tests });
    });
  }

  render() {
    const available_tests = this.state.available_tests.map(test => {
      return (
        <div className="col s12 m4" key={test._id}>
          <div className="card z-depth-1">
            <div className="card-content">
              <Link to={"/test/" + test.test_name}>
                <span
                  className="card-title blue-text"
                  style={{ cursor: "pointer" }}
                >
                  {test.test_name}
                </span>
              </Link>
              <p>Created by: {test.owner_email}</p>
              <p>
                No. of Questions: {test.questions.length}
              </p>
            </div>
            <div className="card-action">
              <p>{test.date}</p>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div style={{ flexGrow: 1 }} className="container">
        <div className="row">
          <div className="col s12">
            <div className="card z-depth-0">
              <div className="card-content">
                <span className="card-title">Welcome to Quiz App</span>
                <p>
                  Anyone can give the available quiz to check yourself. To
                  create your own quiz you need to create an account.
                </p>
              </div>
            </div>
            <div className="card z-depth-5" style={{ marginTop: "100px" }}>
              <div className="card-content">
                <span className="card-title">List of available Quiz</span>
                <div className="row">{available_tests}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
