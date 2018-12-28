import React from "react";
import cxs from "cxs";
import component from "cxs/component";
import PropTypes from "prop-types";
import Trigger from "../shared/Trigger";

const Track = component("div")(props => ({
  color: props.color,
  borderTop: `2px solid ${props.active ? props.color : "black"}`,
  "> h2": {
    marginTop: "5px"
  },
  marginBottom: "1em"
}));

const className = cxs({ padding: "1em" });

const Tracks = ({
  audioset,
  volumes,
  playing,
  status,
  onVolumeChanged,
  onPress,
  onRelease
}) => (
  <div className={className}>
    <h2>Tracks</h2>
    {audioset.tracks.map(track => (
      <Track key={track.id} active={playing[track.id]} color={track.color}>
        <h2>{track.id}</h2>
        <div>
          {track.clipIds.map(clipId => (
            <Trigger
              key={clipId}
              pressed={status[clipId] && status[clipId].isPlaying}
              onPress={() => onPress(clipId)}
              onRelease={() => onRelease(clipId)}
              color={audioset.clips[clipId].display.color}
            >
              {clipId}
            </Trigger>
          ))}
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volumes[track.id]}
          onChange={e => onVolumeChanged(track.id, e.target.value)}
        />
      </Track>
    ))}
  </div>
);

Tracks.propTypes = {
  audio: PropTypes.object
};

export default Tracks;
