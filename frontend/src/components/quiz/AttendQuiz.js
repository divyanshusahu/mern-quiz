import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AttendQuiz extends Component {
  constructor() {
    super();
    this.state = {
      test: {}
    };

    this.quizSubmit = this.quizSubmit.bind(this);
  }

  componentDidMount() {
    let t = unescape(window.location.pathname.split("/")[2]);
    let url = "/api/tests/test/" + t;
    axios.get(url).then(res => {
      this.setState({ test: res.data.test });
    });
  }

  quizSubmit(e) {
    e.preventDefault();
    var formData = {};
    let correct_ans = 0;
    for (let i=0; i<this.state.test.questions.length; i++) {
      let cur_ans = [];
      let a = document.getElementsByName("question_"+i.toString());
      for (let j=0; j<a.length; j++) {
        if (a[j].checked) {
          cur_ans.push((j+1).toString());
        }
      }
      if (JSON.stringify(cur_ans) === JSON.stringify(this.state.test.questions[i].answers)) {
        correct_ans += 1;
      }
      formData[i] = cur_ans;
    }
    toast.success("You got "+correct_ans.toString()+" correct answers.", {
      position: toast.POSITION.TOP_CENTER
    });
  }

  render() {
    var display_questions = <div />;

    try {
      display_questions = this.state.test.questions.map((question, index) => {
        return (
          <div className="row" key={index}>
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <span className="card-title">
                    {question.question_body}
                  </span>
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        name={"question_" + index}
                      />
                      <span>{question.options[0]}</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        name={"question_" + index}
                      />
                      <span>{question.options[1]}</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        name={"question_" + index}
                      />
                      <span>{question.options[2]}</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        name={"question_" + index}
                      />
                      <span>{question.options[3]}</span>
                    </label>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } catch {
      // this can be empty
    }

    return (
      <div style={{ flexGrow: 1, marginBottom: "5rem" }} className="container">
        <div className="row">
          <div className="col s12">
            <div className="card z-depth-0">
              <div className="card-content">
                <span className="card-title">
                  Quiz Name: {this.state.test.test_name}
                </span>
                <p>Created By: {this.state.test.owner_email}</p>
              </div>
            </div>
          </div>
        </div>
        <form noValidate onSubmit={this.quizSubmit} id="quizSubmit">
          {display_questions}
          <button
            type="submit"
            className="btn waves-effect waves-light hoverable blue"
          >
            Submit Quiz
          </button>
        </form>
      </div>
    );
  }
}

export default AttendQuiz;
