import context from "audio-context";

export default class Sampler {
  constructor() {
    this.context = context();
    this.output = this.context.destination;
  }

  start(buffer, when) {
    const { context, output } = this;
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(output);
    source.loop = true;

    when = when || context.currentTime;
    source.start(when);

    return function stop(when) {
      source.stop(when);
    };
  }
}
