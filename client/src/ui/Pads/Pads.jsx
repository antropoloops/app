import React from "react";
import cxs from "cxs/component";
import PropTypes from "prop-types";
import Pad from "./Pad";

const TrackPads = ({ track, status, onPadPressed, onPadReleased }) => (
  <div>
    {track.clipIds.map(name => (
      <Pad
        key={name}
        name={name}
        pressed={status[name] && status[name].isPlaying}
        color={track.color}
        onPress={onPadPressed}
        onRelease={onPadReleased}
      />
    ))}
  </div>
);

const Pads = ({ audioset, status, className, onPadPressed, onPadReleased }) => {
  return (
    <div className={className}>
      {audioset.tracks.map(track => (
        <TrackPads
          key={track.name}
          track={track}
          status={status}
          onPadPressed={onPadPressed}
          onPadReleased={onPadReleased}
        />
      ))}
    </div>
  );
};
Pads.propTypes = {
  onPadPressed: PropTypes.func
};
export default cxs(Pads)({
  backgroundColor: "black",
  minWidth: "30em",
  minHeight: "100%"
});
