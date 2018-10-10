import context from "audio-context";
import Sampler from "./Sampler";
import eventsToSampler from "./eventsToSampler";

const TRACKS = [0, 1, 2, 3, 4, 5, 6, 7];

export default function createSampler(events, ctx) {
  ctx = ctx || context();
  const sampler = new Sampler(ctx, TRACKS);
  eventsToSampler(events, sampler);

  return sampler;
}
