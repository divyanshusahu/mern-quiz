import React, { Component } from "react"
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{flexGrow: 1}}
        className="container"
      >
        <div className="row">
          <div className="col s12 align-center">
            <h5>Basic Auth using MERN stack</h5>
          </div>
          
          <div className="col s6">
            <Link to="/login"
              className="btn btn-large btn-flat waves-effect white black-text"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;