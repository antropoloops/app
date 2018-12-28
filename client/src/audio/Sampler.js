import ctx from "./context";
import {
  stopAudioClip,
  startAudioClip,
  setAudioStatus
} from "../session/actions";
import nextBeat from "./nextBeat";

export default class Sampler {
  constructor(audioset, dispatch) {
    this.bpm = audioset.audio.bpm || 120;
    this.playing = 0;
    this.startedAt = null;
    this.audioset = audioset;
    this.buffers = {};
    this.sources = {};
    this.dispatch = dispatch;
    this.output = createMasterOutput(0.2);
  }

  play(clipId, time) {
    time = time || nextBeat(ctx.currentTime, this.startedAt, this.bpm);
    const buffer = this.buffers[clipId];
    if (!buffer) console.warn("No buffer", clipId);

    this.stopTrack(clipId, time);
    const source = (this.sources[clipId] = ctx.createBufferSource());
    source.buffer = buffer;
    source.loop = true;
    source.connect(this.output);
    source.start(time);
    this.started(clipId, time);
  }
  stop(clipId, time) {
    const source = this.sources[clipId];
    if (!source) return;
    time = time || ctx.currentTime;
    source.stop(time);
    this.sources[clipId] = null;
    this.stopped(clipId, time);
  }

  // stops the clips in the same track
  stopTrack(clipId, time) {
    const clip = this.audioset.clips[clipId];
    const track = this.audioset.tracks.find(track => track.id === clip.trackId);
    track.clipIds.forEach(clipId => this.stop(clipId, time));
  }

  stopAll() {
    const now = ctx.currentTime;
    Object.keys(this.sources).forEach(clipId => this.stop(clipId, now));
  }

  started(clipId, time) {
    if (this.playing === 0) {
      this.startedAt = time;
      this.dispatch(setAudioStatus(true, time));
    }
    this.playing++;
    const { trackId } = this.audioset.clips[clipId];
    this.dispatch(startAudioClip(clipId, trackId, ctx.currentTime));
  }

  stopped(clipId, time) {
    const { trackId } = this.audioset.clips[clipId];
    this.dispatch(stopAudioClip(clipId, trackId, ctx.currentTime));
    this.playing--;
    if (this.playing === 0) {
      this.startedAt = null;
      this.dispatch(setAudioStatus(false, time));
    }
  }
}

function createMasterOutput(gain) {
  const output = ctx.createGain();
  output.gain.value = gain;
  output.connect(ctx.destination);
  return output;
}
