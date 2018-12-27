const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const { buildAudioset } = require("./build/buildAudioset");

const json = obj => JSON.stringify(obj, null, 2);
const mkdir = dir => !fs.existsSync(dir) && fs.mkdirSync(dir);

const readJson = path => JSON.parse(fs.readFileSync(path));

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "audiosets");
const OUTPUTS = [path.join(ROOT, "client", "public", "audiosets")];

main();

function main() {
  const files = Array.from(walkSync(SOURCE))
    .map(f => f.slice(SOURCE.length + 1))
    .filter(f => f.endsWith(".json"))
    .map(f => f.split("/"));
  const grouped = _.groupBy(files, "0");
  const names = Object.keys(grouped);
  const sets = names.map(name => buildSet(name, grouped[name]));
  writeIndex(sets);
}

function writeJsonToOutputs(fileName, object) {
  OUTPUTS.forEach(base => {
    fs.writeFileSync(path.join(base, fileName), json(object));
  });
}

function writeIndex(sets) {
  const index = sets.map(set => ({ id: set.id, meta: set.meta }));
  writeJsonToOutputs("audioset.index.json", index);
}

function buildSet(name, files) {
  const fileName = `${name}.audioset.json`;
  const filePath = path.join(SOURCE, name, fileName);
  const base = readJson(filePath);
  const clips = buildClips(files.filter(f => f.length > 2));
  const set = buildAudioset(base, clips);
  writeJsonToOutputs(fileName, set);
  return set;
}

function buildClips(files) {
  return files.reduce((clips, file) => {
    const [set, track, fileName] = file;
    const [name] = fileName.split(".");
    const clipPath = path.join(SOURCE, set, track, fileName);
    const seed = { name, track };
    const data = readJson(clipPath);
    // name and track first, but overwritte
    const clip = Object.assign(seed, data, seed);
    clips[name] = clip;
    return clips;
  }, {});
}

// https://gist.github.com/luciopaiva/4ba78a124704007c702d0293e7ff58dd
function* walkSync(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const pathToFile = path.join(dir, file);
    const isDirectory = fs.statSync(pathToFile).isDirectory();
    if (isDirectory) {
      yield* walkSync(pathToFile);
    } else {
      yield pathToFile;
    }
  }
}
