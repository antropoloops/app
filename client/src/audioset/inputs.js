import { memo } from "./cache";
import { pressPad, releasePad } from "../session/actions";

export function connect(session) {
  const pressed = {};
  window.onkeydown = function(e) {
    const key = e.key;
    if (pressed[key]) return;
    pressed[key] = true;
    const keyMap = getKeyboardMap(session.getAudioset());
    const clip = keyMap[key];
    if (clip) session.dispatch(pressPad(clip.clipId));
  };

  window.onkeyup = function(e) {
    const key = e.key;
    pressed[key] = false;
    const keyMap = getKeyboardMap(session.getAudioset());
    const clip = keyMap[key];
    if (clip) session.dispatch(releasePad(clip.clipId));
  };

  //
}

export function getKeyboardMap(audioset) {
  return memo(audioset, "keyboardMap", () => buildKeymap(audioset.keyboard));
}

function buildKeymap(keyboard) {
  if (!keyboard) return {};
  const { defaults, keyMap } = keyboard;
  return Object.keys(keyMap).reduce((map, key) => {
    const value = { ...defaults, ...keyMap[key] };
    value.key = key;
    map[key] = value;
    map[key.toUpperCase()] = value;
    map[value.clipId] = value;
    return map;
  }, {});
}

export default { connect };
