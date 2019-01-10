import { throttle } from "lodash";
import Visuals from "./visuals";
import Display from "./display";
import {
  SET_AUDIOSET,
  SET_AUDIO_CLIP_STATUS,
  ATTACH_VISUALS,
  DETACH_VISUALS
} from "../session/actions";
import Resources from "../audioset/resources";

export default { init };

export function init(el) {
  if (!el) el = createElement();
  const display = new Display(el);
  display.setVisible(false);
  let current;
  const resize = throttle(() => {
    if (current) current.render();
  }, 1000);
  window.addEventListener("resize", resize);

  return function effects(action) {
    switch (action.type) {
      case SET_AUDIOSET:
        if (action.audioset) current = createVisuals(action.audioset, display);
        else current = removeVisuals(current, display);
        break;

      // case ATTACH_VISUALS:
      //   const { audioset } = action;
      //   current = createVisuals(audioset, new Display(action.el));
      //   Resources.loadResources(audioset, "covers");
      //   window.addEventListener("resize", current.render);
      //   break;

      // case DETACH_VISUALS:
      //   window.removeEventListener("resize", current.render);
      //   current = null;
      //   break;

      case SET_AUDIO_CLIP_STATUS:
        const { clipId, status } = action;
        if (status.isPlaying) current.show(clipId);
        else current.hide(clipId);
        break;

      default:
        break;
    }
  };
}

function createElement() {
  const el = document.createElement("div");
  el.setAttribute("class", "visuals");
  document.body.appendChild(el);
  return el;
}

function removeVisuals(visuals, display) {
  display.setVisible(false);
  return null;
}

function createVisuals(audioset, display) {
  display.setVisible(true);
  const visuals = new Visuals(audioset, display);
  visuals.render();
  fetch(audioset.visuals.geoMapUrl)
    .then(response => response.json())
    .then(data => visuals.setGeodata(data));

  return visuals;
}
