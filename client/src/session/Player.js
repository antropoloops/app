import { sampleStarted, sampleStopped } from "./events";

export default class Player {
  constructor(events, set) {
    this.events = events;
    this.set = set;
    this.tracks = {};
  }

  pressPad(clipId) {
    return this.togglePlay(clipId);
  }

  releasePad(clipId) {}

  togglePlay(clipId) {
    if (!this.stop(clipId)) this.start(clipId);
  }

  getTrack(clipId) {
    const clip = this.set.clips[clipId];
    return clip && this.set.tracks[clip.trackId];
  }

  start(clipId) {
    const { tracks, events } = this;

    const track = this.getTrack(clipId);
    const prevId = tracks[track.id];
    if (prevId) events.emit(sampleStopped(prevId, track));
    tracks[track.id] = clipId;
    events.emit(sampleStarted(clipId, track));
  }

  stop(clipId) {
    const { tracks, events } = this;
    const track = this.getTrack(clipId);
    const inTrack = tracks[track.id];
    if (track.id && inTrack === clipId) {
      tracks[track.id] = undefined;
      events.emit(sampleStopped(clipId, track));
      return true;
    } else {
      return false;
    }
  }

  stopAll() {
    const { playing, callbacks } = this;
    Object.keys(playing).forEach(id => callbacks[id].stop());
    this.playing = {};
  }
}
