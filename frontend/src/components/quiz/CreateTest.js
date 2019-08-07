import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CreateTest extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onChangeInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <p>{console.log(this.props.create_quiz)}</p>
          </div>
          <div className="col s6">
            <button className="btn btn-small waves-effect waves-light blue accent-3 right">
              Add Question
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CreateTest.propTypes = {
  auth: PropTypes.object.isRequired,
  create_quiz: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  create_quiz: state.create_quiz
});

export default connect(mapStateToProps)(CreateTest);
