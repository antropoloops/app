import {
  SET_AUDIOSET,
  PRESS_PAD,
  RELEASE_PAD,
  AUDIO_STOP_ALL,
  stopAudio
} from "../session/actions";
import Resources from "../audioset/resources";
import Sampler from "./Sampler";
import { memo } from "../audioset/cache";

export default { effects };

const samplers = {};
const getSampler = (audioset, dispatch) => {
  const { id } = audioset;
  if (samplers[id]) return samplers[id];
  samplers[id] = new Sampler(audioset, dispatch);
  return samplers[id];
};
let currentSampler = null;

function restoreState(session, dispatch) {
  if (session.audioset) changeSampler(session.audioset, dispatch);
  // Eventually, we have to do it better
  dispatch(stopAudio());
}

export function effects({ getSession, dispatch, addEffect }) {
  const session = getSession();
  restoreState(session, dispatch);
  return action => {
    switch (action.type) {
      case SET_AUDIOSET:
        return changeSampler(action.audioset, dispatch);
      case PRESS_PAD:
        return playSample(action.clipId);
      case RELEASE_PAD:
        return stopSample(action.clipId);
      case AUDIO_STOP_ALL:
        return currentSampler.stopAll();
      default:
    }
  };
}

function changeSampler(audioset, dispatch) {
  if (audioset) {
    currentSampler = getSampler(audioset, dispatch);
    currentSampler.buffers = Resources.getCachedResources(audioset, "audio");
  } else {
    currentSampler = null;
  }
}

function playSample(id, events) {
  if (!currentSampler) return console.warn("NO sampler!");
  currentSampler.play(id);
}
function stopSample(id, events) {
  if (!currentSampler) return console.warn("NO sampler!");
  currentSampler.stop(id);
}
