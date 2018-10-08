import React from "react";
import logo from "./logo.svg";
import "./index.css";

const Loading = ({ isLoading, render }) =>
  isLoading ? (
    <div className="Loading">
      <header className="Loading-header">
        <img src={logo} className="Loading-logo" alt="logo" />
      </header>
    </div>
  ) : (
    render()
  );

export default Loading;
