const _ = require("lodash");
const fs = require("fs");
const path = require("path");

const json = obj => JSON.stringify(obj, null, 2);
const mkdir = dir => !fs.existsSync(dir) && fs.mkdirSync(dir);

const readJson = path => JSON.parse(fs.readFileSync(path));

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "source");
const OUTPUTS = [
  // path.join(ROOT, "build"),
  path.join(ROOT, "..", "client", "public", "sets")
];

main();

function main() {
  const files = Array.from(walkSync(SOURCE))
    .map(f => f.slice(SOURCE.length + 1))
    .filter(f => f.endsWith(".json"))
    .map(f => f.split("/"));
  const grouped = _.groupBy(files, "0");
  Object.keys(grouped).forEach(name => buildSet(name, grouped[name]));
}

function buildSet(name, files) {
  const fileName = `${name}.audioset.json`;
  const filePath = path.join(SOURCE, name, fileName);
  const set = readJson(filePath);
  const result = buildClips(set, files.filter(f => f.length > 2));
  OUTPUTS.forEach(base => {
    fs.writeFileSync(path.join(base, fileName), json(result));
  });
}

function buildClips(set, files) {
  set.clips = files.reduce((clips, file) => {
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
  return set;
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
