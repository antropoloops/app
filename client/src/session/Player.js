import Sampler from "./Sampler";

const SAMPLE_STARTED = "/player/sample-started";
const SAMPLE_STOPPED = "/player/sample-stopped";

export default class Player {
  constructor(events, set, resources) {
    this.events = events;
    this.set = set;
    this.resources = resources;
    this.sampler = new Sampler();
    this.playing = {};
    this.callbacks = {};
  }

  togglePlay(clipId) {
    if (this.playing[clipId]) this.stop(clipId);
    else this.start(clipId);
  }

  start(clipId) {
    const { set, resources, playing, callbacks, sampler } = this;

    const clip = set.clips[clipId];
    if (!clip) return console.log("Invalid clipdId", clipId);
    const buffer = resources.audio[clipId];
    if (!buffer) return console.log("Audio not loaded");

    playing[clipId] = true;
    callbacks[clipId] = sampler.start(buffer);
    this.events.emit(SAMPLE_STARTED, clipId);
  }

  stop(clipId) {
    if (this.playing[clipId]) {
      this.playing[clipId] = false;
      this.callbacks[clipId]();
      this.events.emit(SAMPLE_STOPPED, clipId);
    }
  }

  stopAll() {
    const { playing, callbacks } = this;
    Object.keys(playing).forEach(id => callbacks[id].stop());
    this.playing = {};
  }
}
