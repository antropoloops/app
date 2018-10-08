import React from "react";

const Header = ({
  set,
  track,
  onHomeClicked,
  onTrackClicked,
  onSetClicked
}) => (
  <div className="Header">
    <button onClick={onHomeClicked}>Antropoloops</button>
    {set && <button onClick={onSetClicked}>{set.id}</button>}
    {track && <button onClick={onTrackClicked}>{track.name}</button>}
  </div>
);

export default Header;
