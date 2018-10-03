import React, { Component } from "react";
import logo from "./logo.svg";
import "./index.css";

class Loading extends Component {
  render() {
    return (
      <div className="Loading">
        <header className="Loading-header">
          <img src={logo} className="Loading-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default Loading;
