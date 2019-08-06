import React, { Component } from "react"
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{flexGrow: 1}}
        className="container"
      >
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">List of available Quiz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
