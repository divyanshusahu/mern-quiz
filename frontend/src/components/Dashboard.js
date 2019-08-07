import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import { createQuiz } from "../actions/createTestActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/Modal.css";
import axios from "axios";
import { Link } from "react-router-dom";

ReactModal.setAppElement("#root");

toast.configure({
  autoClose: 5000,
  draggable: false
});

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      create_quiz_name: "",
      user_precreated_tests: []
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  componentDidMount() {
    var userData = {
      owner_email: this.props.auth.user.email
    };
    axios.post("/api/tests/list_by_email", userData).then(res => {
      this.setState({ user_precreated_tests: res.data.list_by_email });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.create_quiz.data.status === "Success") {
      toast.success("Quiz Created Successfully", {
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout(() => {
        this.props.history.push(
          "/create_test/" + nextProps.create_quiz.data.test.test_name
        );
      }, 5500);
    } else {
      toast.error(nextProps.create_quiz.data.status, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  onChangeInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newQuiz = {
      test_name: this.state.create_quiz_name,
      owner_email: this.props.auth.user.email
    };
    this.props.createQuiz(newQuiz);
  };

  render() {
    const { user } = this.props.auth;

    const created_tests = this.state.user_precreated_tests.map(test => {
      return (
        <div className="col s12 m4" key={test._id}>
          <div className="card z-depth-1">
            <div className="card-content">
              <Link to={"/create_test/" + test.test_name}>
                <span
                  className="card-title blue-text"
                  style={{ cursor: "pointer" }}
                >
                  {test.test_name}
                </span>
              </Link>
              <p>No. of Questions: {test.questions.length}</p>
            </div>
            <div className="card-action">
              <p>{test.date}</p>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged in.
              </p>
            </h4>
            <button
              className="btn waves-effect waves-light hoverable blue"
              onClick={this.handleOpenModal}
            >
              Create Test
            </button>
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
                    id="create_quiz_name"
                    type="text"
                    onChange={this.onChangeInput}
                    name="create_quiz_name"
                    value={this.state.create_quiz_name}
                  />
                  <label htmlFor="create_quiz_name">Quiz Name</label>
                </div>
                <button
                  className="btn btn-small waves-effect waves-light"
                  type="submit"
                >
                  Create Quiz
                </button>
              </form>
            </ReactModal>
          </div>
        </div>
        <p>Your created tests</p>
        <div className="row">{created_tests}</div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  create_quiz: PropTypes.object.isRequired,
  createQuiz: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  create_quiz: state.create_quiz
});

export default connect(
  mapStateToProps,
  { createQuiz }
)(Dashboard);
