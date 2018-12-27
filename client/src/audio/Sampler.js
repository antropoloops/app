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

  play(name, time) {
    time = time || nextBeat(ctx.currentTime, this.startedAt, this.bpm);
    const buffer = this.buffers[name];
    if (!buffer) console.warn("No buffer", name);

    this.stopTrack(name, time);
    const source = (this.sources[name] = ctx.createBufferSource());
    source.buffer = buffer;
    source.loop = true;
    source.connect(this.output);
    source.start(time);
    this.started(name, time);
  }
  stop(name, time) {
    time = time || ctx.currentTime;
    const source = this.sources[name];
    if (!source) return;
    source.stop(time);
    this.sources[name] = null;
    this.stopped(name, time);
  }

  // stops the clips in the same track
  stopTrack(name, time) {
    const clip = this.audioset.clips[name];
    const track = this.audioset.tracks.find(track => track.name === clip.track);
    console.log("track!", track);
    track.clips.forEach(name => this.stop(name, time));
  }

  stopAll() {
    const now = ctx.currentTime;
    Object.keys(this.sources).forEach(name => this.stop(name, now));
  }

  started(name, time) {
    if (this.playing === 0) {
      this.startedAt = time;
      this.dispatch(setAudioStatus(true, time));
    }
    this.playing++;
    this.dispatch(startAudioClip(name, ctx.currentTime));
  }

  stopped(name, time) {
    this.dispatch(stopAudioClip(name, ctx.currentTime));
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
