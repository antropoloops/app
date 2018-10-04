const _ = require("lodash");
const fs = require("fs");
const { join } = require("path");

const lik03 = require("./import/lik03.audioset.json");
const test = require("./import/test.audioset.json");
const continentes = require("./import/continentes.audioset.json");

const json = obj => JSON.stringify(obj, null, 2);
const mkdir = dir => !fs.existsSync(dir) && fs.mkdirSync(dir);
const root = join(__dirname, "..");

importSets({ lik03, test, continentes });

function importSets(sets) {
  const names = Object.keys(sets);
  names.forEach(name => {
    const set = sets[name];
    const clips = _.map(set.clips, (value, key) =>
      Object.assign({ key }, value)
    );

    writeSet(name, set);

    const grouped = _.groupBy(clips, "audio.track");
    const tracks = Object.keys(grouped);
    tracks.forEach(track => {
      const trackPath = join(root, name, `track-${track}`);
      mkdir(trackPath);
      grouped[track].forEach(clip => {
        writeClip(trackPath, clip.key, clip);
      });
    });
  });
}

function writeSet(name, set) {
  set.clips = undefined;
  mkdir(join(root, name));
  const path = join(root, name, `${name}.audioset.json`);
  fs.writeFileSync(path, json(set));
}

function writeClip(trackPath, name, clip) {
  const path = join(trackPath, `${name}.clip.json`);
  const { meta, audio, display } = clip;
  const c = Object.assign({}, meta, { audio, display });
  c.audio.filename = undefined;
  c.audio.track = undefined;
  fs.writeFileSync(path, json(c));
}
