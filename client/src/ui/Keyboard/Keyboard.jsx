import React from "react";
import cxs from "cxs/component";
import PropTypes from "prop-types";
import { getKeyboardMap } from "../../audioset/inputs";
import Trigger from "../shared/Trigger";

const Key = cxs(Trigger)(props => ({
  marginRight: "0.5em",
  padding: "1px 3px"
}));

const Keyboard = ({ audioset, status, className, onPress, onRelease }) => {
  const keyMap = getKeyboardMap(audioset);
  return (
    <div className={className} id="Keyboard">
      {audioset.tracks.map(track =>
        track.clipIds.map(name => (
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
