import React from "react";
import cxs from "cxs/component";
import PropTypes from "prop-types";

const Trigger = ({ onPress, onRelease, className, children }) => (
  <button className={className} onMouseDown={onPress} onMouseUp={onRelease}>
    {children}
  </button>
);

const Key = cxs(Trigger)(props => ({
  border: `1px solid ${props.color}`,
  color: props.color,
  backgroundColor: "black",
  marginRight: "0.5em",
  padding: "1px 3px",
  "&:hover": {
    backgroundColor: props.color,
    color: "black"
  }
}));

function buildKeymap(keyboard) {
  if (!keyboard) return {};
  const { defaults, keyMap } = keyboard;
  return Object.keys(keyMap).reduce((map, key) => {
    const value = { ...defaults, ...keyMap[key] };
    value.key = key;
    map[key] = value;
    map[value.sample] = value;
    return map;
  }, {});
}

const Keyboard = ({ audioset, status, className, onPress, onRelease }) => {
  const keyMap = buildKeymap(audioset.keyboard);
  return (
    <div className={className}>
      {audioset.tracks.map(track =>
        track.clips.map(name => (
          <Key
            key={name}
            pressed={status[name] && status[name].isPlaying}
            color={track.color}
            onPress={() => onPress(name)}
            onRelease={() => onRelease(name)}
          >
            {keyMap[name] ? keyMap[name].key.toUpperCase() : "-"}
          </Key>
        ))
      )}
    </div>
  );
};
Keyboard.propTypes = {
  onKeyPressed: PropTypes.func
};
export default cxs(Keyboard)({
  backgroundColor: "black",
  textAlign: "center",
  padding: "2px 10px 4px 10px"
});
