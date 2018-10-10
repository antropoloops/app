import React from "react";
import { connect } from "react-redux";
import Pads from "./Pads";
import Pad from "./Pads/Pad";
import { openTrack, padPress, padRelease } from "../../model/control";

const renderTracks = ({ set, tracksPlaying, dispatch }) =>
  set.tracks.map(track => (
    <Pad
      key={track.name}
      label={track.name}
      color={track.color}
      isPressed={tracksPlaying[track.name]}
      onPress={() => dispatch(openTrack(track))}
    />
  ));

const renderClips = ({ set, track, clipsPlaying, dispatch }) =>
  track.clips.map(name => {
    const clip = set.clips[name];
    return (
      <Pad
        key={clip.name}
        label={clip.name}
        color={clip.display.color}
        isPressed={clipsPlaying[clip.name]}
        onPress={() => dispatch(padPress(clip.name))}
        onRelease={() => dispatch(padRelease(clip.name))}
      />
    );
  });

const Control = props => (
  <div>
    <Pads>{props.track ? renderClips(props) : renderTracks(props)}</Pads>
  </div>
);

const mapStateToProps = state => state.control;

export default connect(mapStateToProps)(Control);
