/**
 * A sampler
 */
export default class Sampler {
  constructor(context, trackIds, buffers = {}) {
    this.context = context;
    this.buffers = buffers;
    this.output = gain(0.7, context, context.destination);
    this.tracks = trackIds.reduce((tracks, trackId) => {
      tracks[trackId] = { trackId, output: gain(1, context, this.output) };

      return tracks;
    }, {});
  }

  setBuffers(buffers) {
    this.buffers = buffers;
  }

  start(clipId, trackId, when) {
    const { context, output, tracks, buffers } = this;
    const buffer = buffers[clipId];
    if (!buffer) return console.warn(`No buffer for ${clipId}`);

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(output);
    source.loop = true;

    when = when || context.currentTime;
    this.stop(undefined, trackId, when);
    source.start(when);

    tracks[trackId].stop = function stop(when) {
      source.stop(when);
    };
  }

  stop(clipId, trackId) {
    const track = this.tracks[trackId];
    if (track) {
      track.stop && track.stop();
      track.stop = undefined;
    } else {
      console.log(`No track for ${trackId}`);
    }
  }
}

function gain(gain, context, output) {
  const out = context.createGain();
  out.gain.value = gain;
  out.connect(output);
  return out;
}
