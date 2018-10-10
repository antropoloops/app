import React from "react";

const Track = ({ color, isPlaying }) => (
  <div
    className="Track"
    style={{
      borderColor: color,
      backgroundColor: isPlaying ? color : "transparent"
    }}
  />
);

const Tracks = ({ set, tracksPlaying }) => (
  <div className="TracksHeader">
    {set &&
      set.tracks.map(track => (
        <Track
          key={track.id}
          color={track.color}
          isPlaying={tracksPlaying[track.name]}
        />
      ))}
    <Track color={"#FFF"} />
  </div>
);

export default Tracks;
