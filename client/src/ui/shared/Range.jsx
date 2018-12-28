import React from "react";
import cxs from "cxs/component";
import PropTypes from "prop-types";

const Base = ({ value, onChange }) => (
  <input type="range" min="0" max="100" value={value} onChange={onChange} />
);
Base.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func
};

const Range = cxs(Base)(props => ({
  width: "100%"
}));

Range.propTypes = {
  color: PropTypes.string
};

export default Range;
