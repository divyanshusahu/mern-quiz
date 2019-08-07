import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import ReactModal from "react-modal";
import { addQuestion } from "../../actions/createTestActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CreateTest extends Component {
  constructor() {
    super();
    this.state = {
      test: {},
      showModal: false
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  componentDidMount() {
    let t = window.location.pathname.split("/")[2];
    let url = "/api/tests/test/" + t;
    axios.get(url).then(res => {
      this.setState({ test: res.data.test });
    });
  }

  updateDisplay() {
    let t = window.location.pathname.split("/")[2];
    let url = "/api/tests/test/" + t;
    axios.get(url).then(res => {
      this.setState({ test: res.data.test });
    });
  }

  onChangeInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  onSubmit = e => {
    e.preventDefault();

    const newQuestion = {
      question_body: this.state.question_body,
      option_1: this.state.option_1,
      option_2: this.state.option_2,
      option_3: this.state.option_3,
      option_4: this.state.option_4,
      answer: this.state.answer,
      test_name: this.state.test.test_name
    };
    this.props.addQuestion(newQuestion);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.add_question.data.status === "Success") {
      toast.success("Question successfully added", {
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout(() => {
        this.handleCloseModal();
        this.updateDisplay();
      }, 5500);
    } else {
      toast.error(nextProps.create_quiz.data.status, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  render() {
    var display_questions = <div />;
    try {
      if (this.state.test["questions"].length) {
        display_questions = this.state.test["questions"].map(
          (question, index) => {
            return (
              <div className="row" key={index}>
                <div className="col s12">
                  <div className="card">
                    <div className="card-content">
                      <p>{question.question_body}</p>
                      <p>Options:</p>
                      <p>{question.options[0]}</p>
                      <p>{question.options[1]}</p>
                      <p>{question.options[2]}</p>
                      <p>{question.options[3]}</p>
                      <p>Answer: {question.answers}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        );
      }
    } catch {
      // this can be empty
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <p>Quiz Name: {this.state.test.test_name}</p>
          </div>
          <div className="col s6">
            <button
              className="btn btn-small waves-effect waves-light blue accent-3 right"
              onClick={this.handleOpenModal}
            >
              Add Question
            </button>
          </div>
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Create Test"
          onRequestClose={this.handleCloseModal}
          className="Modal"
          overlayClassName="Overlay"
          closeTimeoutMS={500}
        >
          <button
            onClick={this.handleCloseModal}
            className="btn btn-small btn-flat waves-effect waves-light right"
          >
            <i className="material-icons">close</i>
          </button>

          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field">
              <input
                id="question_body"
                type="text"
                onChange={this.onChangeInput}
                name="question_body"
                value={this.state.question_body}
              />
              <label htmlFor="question_body">Question</label>
            </div>
            <div className="row">
              <div className="col s6">
                <div className="input-field">
                  <input
                    id="option_1"
                    type="text"
                    onChange={this.onChangeInput}
                    name="option_1"
                    value={this.state.option_1}
                  />
                  <label htmlFor="option_1">Option 1</label>
                </div>
              </div>
              <div className="col s6">
                <div className="input-field">
                  <input
                    id="option_2"
                    type="text"
                    onChange={this.onChangeInput}
                    name="option_2"
                    value={this.state.option_2}
                  />
                  <label htmlFor="option_2">Option 2</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <div className="input-field">
                  <input
                    id="option_3"
                    type="text"
                    onChange={this.onChangeInput}
                    name="option_3"
                    value={this.state.option_3}
                  />
                  <label htmlFor="option_3">Option 3</label>
                </div>
              </div>
              <div className="col s6">
                <div className="input-field">
                  <input
                    id="option_4"
                    type="text"
                    onChange={this.onChangeInput}
                    name="option_4"
                    value={this.state.option_4}
                  />
                  <label htmlFor="option_4">Option 4</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s6 offset-s3">
                <div className="input-field">
                  <input
                    id="answer"
                    type="text"
                    onChange={this.onChangeInput}
                    name="answer"
                    value={this.state.answer}
                  />
                  <label htmlFor="answer">Answer (Like 1,3)</label>
                </div>
              </div>
            </div>
            <button
              className="btn btn-small waves-effect waves-light"
              type="submit"
            >
              Done
            </button>
          </form>
        </ReactModal>
        <div>{display_questions}</div>
      </div>
    );
  }
}

CreateTest.propTypes = {
  auth: PropTypes.object.isRequired,
  addQuestion: PropTypes.func.isRequired,
  add_question: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  add_question: state.add_question
});

export default connect(
  mapStateToProps,
  { addQuestion }
)(CreateTest);
