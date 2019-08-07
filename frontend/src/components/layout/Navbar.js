import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <div className="container">
              <Link to="/" className="brand-logo black-text">
                Quiz App
              </Link>
              <ul className="right">
                <li>
                  {this.props.auth.isAuthenticated ? (
                    <Link to="/logout" className="black-text" onClick={this.onLogoutClick}>
                      Logout
                    </Link>
                  ) : (
                    <Link to="/login" className="black-text">
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);
