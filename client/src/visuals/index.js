import Display from "./display";
import { START_VISUALS, STOP_VISUALS } from "../session/events";
import { SET_AUDIO_CLIP_STATUS } from "../session/actions";
import Resources from "../audioset/resources";
export default { connect };

export function connect(session) {
  const { events } = session;
  let display;

  events.on(START_VISUALS, ({ audioset, el }) => {
    display = createDisplay(audioset, el);
    Resources.loadResources(audioset, "covers");
  });

  events.on(STOP_VISUALS, () => {
    if (display && display.resize) {
      window.removeEventListener("resize", display.resize);
    }
  });

  events.on("action", action => {
    if (action.type === SET_AUDIO_CLIP_STATUS) {
      if (action.status.isPlaying) display.show(action.clipId);
      else display.hide(action.clipId);
    }
  });
}

export function init(set, events, el) {}

function createDisplay(audioset, el) {
  const display = new Display(audioset, el);
  display.resize = () => display.render();
  window.addEventListener("resize", display.resize);
  display.render();
  fetch(audioset.visuals.geoMapUrl)
    .then(response => response.json())
    .then(data => display.setGeodata(data));

  return display;
}
