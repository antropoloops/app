import React from "react";
import cxs from "cxs/component";
import PropTypes from "prop-types";
import { Icon } from "../shared";

const Toolbar = ({
  className,
  audioset,
  audio,
  onCloseAudioset,
  onStopAll,
  onTogglePads,
  onToggleTracks,
  onFullscreen
}) => (
  <header className={className}>
    <div>
      <Icon icon="fly" onClick={onCloseAudioset} />
    </div>
    <Connection>
      {audioset.meta.title}: {audioset.meta.description}
    </Connection>
    <Transport>
      {audio.isPlaying ? <Icon icon="stop" onClick={onStopAll} /> : ""}
      <Icon icon="mute" />
    </Transport>
    <Icon icon="controls" onClick={onToggleTracks} />
    <Icon icon="cinema" onClick={onFullscreen} />
  </header>
);
Toolbar.propTypes = {
  audioset: PropTypes.object
};

const Transport = cxs("div")({});
const Connection = cxs("div")({
  marginTop: "3px",
  flexGrow: 1,
  textAlign: "center"
});

export default cxs(Toolbar)({
  display: "flex",
  flexDirection: "row",
  backgroundColor: "black",
  padding: "2px 10px"
});