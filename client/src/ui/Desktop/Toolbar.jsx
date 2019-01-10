import React from "react";
import cxs from "cxs/component";
import PropTypes from "prop-types";
import { Icon, Link } from "../shared";

const Toolbar = ({
  className,
  audioset,
  audio,
  onCloseAudioset,
  onStopAll,
  onHelp,
  onToggleTracks,
  onTogglePads,
  onFullscreen
}) => (
  <header className={className}>
    <div>
      <Icon icon="fly" onClick={onHelp} />
    </div>
    <Connection id="Connection" onClick={onCloseAudioset}>
      {audioset.meta.title}: {audioset.meta.description}
    </Connection>
    <Transport id="Transport">
      {audio.isPlaying ? <Icon icon="stop" onClick={onStopAll} /> : ""}
      <Icon icon="mute" />
    </Transport>
    <Icon icon="controls" onClick={onTogglePads} />
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
