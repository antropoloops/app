import React from "react";
import { connect } from "react-redux";
import Pads from "./Pads";
import Pad from "./Pads/Pad";
import { openTrack } from "../../model/control";
import { getSession } from "../../../session";

const togglePlay = (set, clip) => () => {
  const player = getSession().player;
  player.togglePlay(clip.name);
};

const renderTracks = (tracks, dispatch) =>
  tracks.map(track => (
    <Pad
      key={track.name}
      label={track.name}
      color={track.color}
      onClick={() => dispatch(openTrack(track))}
    />
  ));

const renderClips = (set, clips, dispatch) =>
  console.log(clips) ||
  clips.map(name => {
    const clip = set.clips[name];
    return (
      <Pad
        key={clip.name}
        label={clip.name}
        color={clip.color}
        onClick={togglePlay(set, clip)}
      />
    );
  });

const Control = ({ set, track, dispatch }) => (
  <div>
    <Pads>
      {track
        ? renderClips(set, track.clips, dispatch)
        : renderTracks(set.tracks, dispatch)}
    </Pads>
  </div>
);

const mapStateToProps = state => state.control;

export default connect(mapStateToProps)(Control);
