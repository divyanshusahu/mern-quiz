import React, { Component } from "react";
import axios from "axios";

class AttendQuiz extends Component {
  constructor() {
    super();
    this.state = {
      test: {}
    };
  }

  componentDidMount() {
    let t = window.location.pathname.split("/")[2];
    let url = "/api/attend_quiz/test/"+t;
    axios.get(url).then(res => {
      this.setState({ test: res.data.test });
    });
  }

  render() {
    return (
      <div style={{ flexGrow: 1 }} className="container">
        <div className="row">
          <div className="col s12">
            <div className="card z-depth-0">
              <div className="card-content">
                <span className="card-title">Quiz Name: {this.state.test.test_name}</span>
                <p>
                  Created By: {this.state.test.owner_email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AttendQuiz;
