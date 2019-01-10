import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import cxs from "cxs";

const Visuals = ({ audioset, onStart, onStop }) => {
  const el = useRef(null);
  useEffect(
    () => {
      if (!audioset) return;
      onStart(audioset, el.current);
      return () => onStop();
    },
    [el.current]
  );
  return <div className={className} ref={el} />;
};

Visuals.propTypes = {
  audioset: PropTypes.object,
  events: PropTypes.object
};

const className = cxs({
  backgroundColor: "gray",
  height: "100%"
});

export default Visuals;
