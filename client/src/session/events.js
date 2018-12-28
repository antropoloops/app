import nanobus from "nanobus";

export const events = nanobus();

export const START_VISUALS = "START_VISUALS";
export const startVisuals = (audioset, el) => ({
  type: START_VISUALS,
  audioset,
  el
});
export const STOP_VISUALS = "STOP_VISUALS";
export const stopVisuals = () => ({ type: STOP_VISUALS });

/**
 * A unified event model
 * @param {*} event
 */
export function emit(event) {
  events.emit(event.type, event);
}

events.on("*", (type, event) => {
  if (type !== "action") console.log("event", type, event);
});

const middleware = store => next => action => {
  next(action);
  events.emit("action", action);
};

export default middleware;
