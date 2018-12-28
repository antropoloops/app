import React from "react";
import PropTypes from "prop-types";
import Desktop from "./Desktop";

const App = ({ events }) => {
  return <Desktop events={events} />;
};
App.propTypes = {};
export default App;
