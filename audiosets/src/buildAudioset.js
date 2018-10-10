const _ = require("lodash");
const { getTrackColor } = require("./colors");

function buildAudioset(base, clips) {
  const set = Object.assign({}, base, { clips });
  set.tracks = buildTracks(set);

  return set;
}

module.exports = { buildAudioset };

function buildTracks(set) {
  const tracks = _.groupBy(set.clips, "track");
  return _.map(tracks, (track, name) => ({
    name,
    clips: track.map(clip => clip.name)
  })).map((track, id) => {
    track.id = id;
    track.color = getTrackColor(id);
    setClipTrackProps(set, track);
    return track;
  });
}

function setClipTrackProps(set, track) {
  track.clips.forEach(name => {
    const clip = set.clips[name];
    clip.trackId = track.id;
    clip.display = Object.assign({}, clip.display, {
      color: getTrackColor(track.id)
    });
  });
}
