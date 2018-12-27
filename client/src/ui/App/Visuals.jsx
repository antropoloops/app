import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import cxs from "cxs/component";
import { START_VISUALS, STOP_VISUALS } from "../../session/events";

const Visuals = ({ className, audioset, events }) => {
  const el = useRef(null);
  useEffect(
    () => {
      events.emit(START_VISUALS, { audioset, el: el.current });
      return () => events.emit(STOP_VISUALS);
    },
    [audioset]
  );
  return <div className={className} ref={el} />;
};

Visuals.propTypes = {
  audioset: PropTypes.object,
  events: PropTypes.object
};

export default cxs(Visuals)({
  backgroundColor: "gray",
  height: "100%"
});
