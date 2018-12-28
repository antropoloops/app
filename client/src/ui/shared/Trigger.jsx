import React from "react";
import cxs from "cxs/component";
import PropTypes from "prop-types";

const Base = ({ onPress, onRelease, className, children }) => (
  <button className={className} onMouseDown={onPress} onMouseUp={onRelease}>
    {children}
  </button>
);
Base.propTypes = {
  pressed: PropTypes.bool,
  onPress: PropTypes.func,
  onRelease: PropTypes.func
};

const Trigger = cxs(Base)(props => ({
  border: `2px solid ${props.color}`,
  color: props.color,
  backgroundColor: props.pressed ? props.color : "black",
  marginRight: "0.5em",
  padding: "1px 3px",
  "&:hover": {
    backgroundColor: props.color,
    color: "black"
  }
}));

Trigger.propTypes = {
  color: PropTypes.string
};

export default Trigger;
