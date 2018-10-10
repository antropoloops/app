const chroma = require("chroma-js");

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

const S = Math.random() * 0.5 + 0.5;
const V = Math.random() * 0.1 + 0.9;

const RANGES = [
  [105, 120],
  [145, 160],
  [300, 315],
  [330, 345],
  [190, 205],
  [210, 225],
  [25, 40],
  [50, 65]
];
const MAX_TRACKS = RANGES.length;

function createColor(h, s = S, v = V) {
  return chroma.hsv(h, S, V).hex();
}

function fromRange([min, max]) {
  return createColor(random(min, max));
}

function getTrackColor(trackNum) {
  return fromRange(RANGES[trackNum % MAX_TRACKS]);
}

const COLORS = RANGES.map(fromRange);

module.exports = { RANGES, COLORS, getTrackColor, fromRange, createColor };
