import nanobus from "nanobus";

const eventType = event =>
  typeof event === "function" ? event().type : event.toString();

export default function createEventBus() {
  const events = nanobus();
  const emit = event => events.emit(event.type, event.payload);
  const on = (event, cb) => events.on(eventType(event), cb);
  return { emit, on };
}

// SESSION
export const audiosetChanged = (set, resources) => ({
  type: "/session/audiosetChanged",
  payload: { set, resources }
});

// RESOURCES
export const loadResourcesStarted = requests => ({
  type: "/resources/loadResourcesStarted",
  payload: requests
});
export const loadAudioEnded = requests => ({
  type: "/resources/loadAudioEnded",
  payload: requests
});

// PLAYER
export const sampleStarted = (clipId, track) => ({
  type: "/player/sampleStarted",
  payload: { clipId, track }
});

export const sampleStopped = (clipId, track) => ({
  type: "/player/sampleStopped",
  payload: { clipId, track }
});
