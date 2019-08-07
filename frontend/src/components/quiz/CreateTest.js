import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CreateTest extends Component {
  constructor() {
    super();
    this.state = {
      test_name: "",
      num_questions: 0,
      questions: []
    };
  }

  onChangeInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeTextarea = (e,i)=> {
    this.setState((prevState) => {
      let newState = prevState;
      //e.target.id = e.target.value;
      if (newState.num_questions > i){
        newState.questions.push({
          q_body: "",
          q_options: [],
          q_answers: []
        });
        console.log(this.state);
      }
      newState.questions[i]["q_body"] = "e.target.value";
      return newState;
    });
  }

  add_question = () => {
    this.setState(prevState => {
      let newState = prevState;
      newState.num_questions = newState.num_questions + 1;
      return newState;
    });
  };

  add_options = e => {};

  render() {
    const questions = [];
    for (var i = 0; i < this.state.num_questions; i++) {
      questions.push(
        <div key={i + 1} className="card z-depth-3">
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id={"ques_" + i + 1}
                className="materialize-textarea"
                name={"ques_" + i + 1}
              />
              <label htmlFor={"ques_" + i + 1}>Question {i + 1}</label>
            </div>
          </div>
          <div />
          <div>
            <button className="btn-floating waves-effect waves-light blue">
              <i className="material-icons">add</i>
            </button>
          </div>
        </div>
      );
    }

    const { user } = this.props.auth;
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <p>Create Test</p>
          </div>
          <div className="col s6">
            <div className="right">
              <Link to="/dashboard">
                <span>Back to dashboard</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="input-field">
          <input
            placeholder="Test Name"
            id="test_name"
            type="text"
            value={this.state.test_name}
            onChange={this.onChangeInput}
            name="test_name"
          />
          <label htmlFor="first_name">Enter Test Name</label>
        </div>
        {questions}
        <button
          className="btn waves-effect waves-light blue accent-3"
          onClick={this.add_question}
        >
          Add Question
        </button>
      </div>
    );
  }
}

CreateTest.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CreateTest);
