const _ = require("lodash");
const { getTrackColor } = require("./colors");

function buildAudioset(base, clips) {
  const set = Object.assign({}, base, { clips });
  const tracks = buildTracks(set);
  tracks.forEach(track => setClipTrackProps(set, track));
  set.tracks = tracks;

  return set;
}

module.exports = { buildAudioset };

function buildTracks(set) {
  const clipsByTrack = _.groupBy(set.clips, "trackId");
  const trackIds = Object.keys(clipsByTrack).sort();
  return trackIds.map((id, num) => ({
    id,
    clipIds: clipsByTrack[id].map(clip => clip.name),
    num,
    color: getTrackColor(num)
  }));
}

function setClipTrackProps(set, track) {
  track.clipIds.forEach(name => {
    const clip = set.clips[name];
    clip.trackNum = track.num;
    clip.display = Object.assign({}, clip.display, {
      color: track.color
    });
  });
}
