import {
  sampleStarted,
  sampleStopped,
  audiosetChanged
} from "../session/events";

export default function createAudioPlayer(events, sampler) {
  events.on(audiosetChanged, e => sampler.setBuffers(e.resources.audio));
  events.on(sampleStarted, e => sampler.start(e.clipId, e.track.id, e.time));
  events.on(sampleStopped, e => sampler.stop(e.clipId, e.track.id, e.time));
}
