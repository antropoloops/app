import React from "react";
import Tracks from "./Tracks";
import "./Header.css";

const Breadcrumbs = ({
  set,
  track,
  onHomeClicked,
  onTrackClicked,
  onSetClicked
}) => (
  <div className="Breadcrumbs">
    <button onClick={onHomeClicked}>Antropoloops</button>
    {set && <button onClick={onSetClicked}>{set.id}</button>}
    {track && <button onClick={onTrackClicked}>{track.name}</button>}
  </div>
);

const Header = props => (
  <div className="Header">
    <Breadcrumbs {...props} />
    <Tracks {...props} />
  </div>
);

export default Header;
