import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import "../assets/css/Modal.css";

ReactModal.setAppElement("#root");

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  onChangeInput = (e) => {
    this.setState({ [e.target.id]: [e.target.value ] })
  }

  render() {
    const { user } = this.props.auth;

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
              closeTimeoutMS={2000}
            >
              <div className="input-field">
                <input id="create_quiz_name" type="text" onChange={this.onChangeInput} />
                <label htmlFor="first_name">Quiz Name</label>
              </div>
              <button
                className="btn btn-small waves-effect waves-light"
              >
                Create Quiz
              </button>
              <button
                onClick={this.handleCloseModal}
                className="btn btn-small waves-effect waves-light right"
              >
                Close
              </button>
            </ReactModal>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
