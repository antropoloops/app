import React from "react";
import { connect } from "react-redux";

const Connections = ({ status, userId }) => (
  <div>
    <div>
      <label>State:</label>
      {status}
    </div>
    <div>
      <label>Room:</label>
      {userId}
    </div>
  </div>
);

const mapStateToProps = state => state.app;

export default connect(mapStateToProps)(Connections);
