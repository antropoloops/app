import {
  SET_AUDIOSET,
  PRESS_PAD,
  RELEASE_PAD,
  AUDIO_STOP_ALL,
  stopAudio
} from "../session/actions";
import Resources from "../audioset/resources";
import Sampler from "./Sampler";

const samplers = {};
const getSampler = (audioset, dispatch) => {
  const { id } = audioset;
  if (samplers[id]) return samplers[id];
  samplers[id] = new Sampler(audioset, dispatch);
  return samplers[id];
};
let currentSampler = null;

// Eventually, we have to do it better
function restoreState(state, events, store) {
  store.dispatch(stopAudio());
}

export function connect(session) {
  const { events, store } = session;
  const state = store.getState();
  if (state.audioset) setAudioset(state.audioset, store.dispatch);

  restoreState(state, events, store);

  events.on("action", action => {
    const { type } = action;
    if (type === SET_AUDIOSET) setAudioset(action.audioset, store.dispatch);
    else if (type === PRESS_PAD) playSample(action.clipId);
    else if (type === RELEASE_PAD) stopSample(action.clipId);
    else if (type === AUDIO_STOP_ALL) currentSampler.stopAll();
  });
}

function setAudioset(audioset, dispatch) {
  if (!audioset) return;
  currentSampler = getSampler(audioset, dispatch);
  currentSampler.buffers = Resources.getCachedResources(audioset, "audio");
}

function playSample(id, events) {
  if (!currentSampler) return console.warn("NO sampler!");
  currentSampler.play(id);
}
function stopSample(id, events) {
  if (!currentSampler) return console.warn("NO sampler!");
  currentSampler.stop(id);
}

export default { connect };
